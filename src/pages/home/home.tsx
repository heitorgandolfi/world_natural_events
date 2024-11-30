import { useEffect, useState } from "react";

import { Event } from "../../models/Event";
import { getCategories, getEvents } from "../../services/api";
import { MapView } from "./components/MapView";

export const HomePage = () => {
  const [cordinates, setCoordinates] = useState<number[]>([51.505, -0.09]);
  const [queries, setQueries] = useState({
    days: "1",
    category: "",
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setQueries((prevQueries) => ({
      ...prevQueries,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents(queries.days, queries.category);
      setEvents(events);
    };
    fetchEvents();
  }, [queries]);

  return (
    <div>
      <form
        className="absolute top-6 right-3 z-[1000] p-3 rounded flex items-center bg-white shadow-lg text-black gap-3"
        onSubmit={() => {}}
      >
        <label htmlFor="days">Events in the last</label>
        <select
          className="bg-gray-200 rounded cursor-pointer"
          name="days"
          id="days"
          onChange={handleSelectChange}
        >
          <option value="1">1</option>
          <option value="7">7</option>
          <option value="14">14</option>
          <option value="30">30</option>
        </select>
        <p>{queries.days === "1" ? "day." : "days."}</p>

        <label htmlFor="category">Type of event</label>
        <select
          className="bg-gray-200 rounded cursor-pointer capitalize"
          name="category"
          id="category"
          onChange={handleSelectChange}
          value={queries.category}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </form>
      <MapView events={events} coordinates={cordinates} />
    </div>
  );
};
