import { useEffect, useState } from "react";
import { FaCalendarDay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [days, setDays] = useState([]);
  const [stockDates, setStockDates] = useState([]);

  useEffect(() => {
    renderCalendar();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const fetchStockDates = async () => {
      const name = localStorage.getItem("loggedInUser");
      if (!name) {
        console.error("No loggedInUser found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:6060/product/userData?name=${name}`
        );

        if (!response.ok) {
          console.error("Failed to fetch stock data", response.statusText);
          return;
        }

        const data = await response.json();

        const dates = data
          .map((item) => {
            const date = item.date || item.createdAt;
            if (date) {
              return new Date(date);
            } else {
              console.warn("Missing date or createdAt for item", item);
              return null;
            }
          })
          .filter(Boolean);

        setStockDates(dates);
      } catch (error) {
        console.error("Error fetching stock dates", error);
      }
    };

    fetchStockDates();
  }, []);

  const renderCalendar = () => {
    const date = new Date(currentYear, currentMonth, 1);
    const firstDayIndex = date.getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayDate = lastDay.getDate();
    const lastDayIndex = lastDay.getDay();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    let daysArray = [];

    for (let x = firstDayIndex; x > 0; x--) {
      daysArray.push({ number: prevLastDayDate - x + 1, type: "prev" });
    }

    for (let i = 1; i <= lastDayDate; i++) {
      const isToday =
        i === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      const isStockDate = stockDates.some((stockDate) => {
        return (
          stockDate.getDate() === i &&
          stockDate.getMonth() === currentMonth &&
          stockDate.getFullYear() === currentYear
        );
      });

      daysArray.push({
        number: i,
        type: isToday ? "today" : isStockDate ? "stock" : "current",
      });
    }

    for (let j = 1; j <= nextDays; j++) {
      daysArray.push({ number: j, type: "next" });
    }

    setDays(daysArray);
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const isCurrentMonth =
    currentMonth === today.getMonth() && currentYear === today.getFullYear();

  useEffect(() => {}, [days]);

  return (
    <div className="container">
      <div className="calendar">
        <div className="header">
          <div className="month">
            {months[currentMonth]} {currentYear}
          </div>
          <div className="calender-btns">
            {!isCurrentMonth && (
              <div className="calender-btn" onClick={goToToday}>
                <FaCalendarDay />
              </div>
            )}
            <div className="calender-btn" onClick={prevMonth}>
              <FaChevronLeft />
            </div>
            <div className="calender-btn" onClick={nextMonth}>
              <FaChevronRight />
            </div>
          </div>
        </div>
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={index} className="day">
                {day}
              </div>
            )
          )}
        </div>
        <div className="days">
          {days.map((day, index) => (
            <div
              key={index}
              className={`day ${day.type === "prev" ? "prev" : ""} ${
                day.type === "next" ? "next" : ""
              } ${day.type === "today" ? "today" : ""} ${
                day.type === "stock" ? "stock" : ""
              }`}
            >
              {day.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
