import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Topic.css";
import Lo from "../../Components/Test/Lo";
import Search from "../../Components/Search/search";

function Topic() {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [topic, setTopic] = useState([]);
  const [newTopic, setNewTopic] = useState([]);
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState([]);
  const [topicId, setTopicId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://cardsy.onrender.com/topic");
        setTopics(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [newTopic]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://cardsy.onrender.com/category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [newCategory]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://cardsy.onrender.com/subcategory");
        setSubcategories(response.data);
        // console.log("sub", subcategories)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [newSubcategory]);

  const handleAddTopic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://cardsy.onrender.com/topic`, {
        topic: topic,
      });
      setNewTopic(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://cardsy.onrender.com/category`, {
        category: category,
        topic_id: topicId,
      });
      setNewCategory(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://cardsy.onrender.com/subcategory`, {
        subcategory: subcategory,
        category_id: categoryId,
        topic_id: topicId,
      });
      setNewSubcategory(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Lo />
      <div className="topicPage">
        <Search />
        <div>
          <div className="addNewTopic">
            <div className="topicdiv">
              <p className="userdet4">List of Topics:</p>
              {topics.map((item, i) => (
                <button key={i} className="topicButton">{item.topic}</button>
              ))}
            </div>
            <div className="topicSection">
              <label className="userdet1">Add Topic:</label>
              <br />
              <input
                className="topicInput"
                placeholder="New Topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <button className="topicButton" onClick={handleAddTopic}>
                Add
              </button>
            </div>
          </div>

          <hr className="topicHr" />
          <div className="addNewTopic">
            <div className="topicdiv">
              <p className="userdet4">List of Categories:</p>
              {categories.map((item, i) => (
                <button key={i} className="topicButton">{item.category}</button>
              ))}
            </div>
            <div className="topicSection">
              <label className="userdet1">Add Category:</label>
              <br />
              <input
                className="topicInput"
                placeholder="New Category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div className="username">
                <label className="userdet1">Topic:</label> <br />
                <select
                  id="topic"
                  name="topic_id"
                  value={topicId[0]}
                  onChange={(e) => setTopicId([e.target.value])}
                >
                  <option value="">Select a topic...</option>
                  {topics.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.topic}
                    </option>
                  ))}
                </select>
              </div>
              <button className="topicButton" onClick={handleAddCategory}>
                Add
              </button>
            </div>
          </div>
          <hr className="topicHr" />
          <div className="addNewTopic">
            <div className="topicdiv">
              <p className="userdet4">List of Subcategories:</p>
              {subcategories.map((item, i) => (
                <button key={i} className="topicButton">{item.subcategory}</button>
              ))}
            </div>
            <div className="topicSection">
              <label className="userdet1">Add Subcategory:</label> <br />
              <input
                className="topicInput"
                placeholder="New Subcategory"
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              />
              <div className="username">
                <label className="userdet1">Category:</label> <br />
                <select
                  id="topic"
                  name="category_id"
                  value={categoryId[0]}
                  onChange={(e) => setCategoryId([e.target.value])}
                >
                  <option value="">Select a category...</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="userdet1">Topic:</label> <br />
                <select
                  id="topic"
                  name="topic_id"
                  value={topicId[0]}
                  onChange={(e) => setTopicId([e.target.value])}
                >
                  <option value="">Select a topic...</option>
                  {topics.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.topic}
                    </option>
                  ))}
                </select>
              </div>
              <button className="topicButton" onClick={handleAddSubCategory}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topic;

