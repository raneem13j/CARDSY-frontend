import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import "./Post.css";
import "react-toastify/dist/ReactToastify.css";
import Lo from "../../Components/Test/Lo";
import Search from "../../Components/Search/search";

function Post() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const edit = params.get("edit");
  const userId = sessionStorage.getItem("Id");
  const deckId = useParams();
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);

  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [cardCount, setCardCount] = useState("");
  const [topicId, setTopicId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://cardsy.onrender.com/topic");
        setTopics(response.data);
        // console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://cardsy.onrender.com/category");
        setCategories(response.data);
        // console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://cardsy.onrender.com/subcategory");
        setSubcategories(response.data);
        // console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (edit === "true") {
      async function fetchDeck() {
        try {
          const deckResponse = await axios.get(
            `https://cardsy.onrender.com/deck/${deckId.id}`
          );
          const deckData = deckResponse.data;
          setName(deckData.name);
          setLevel(deckData.level);
          setCardCount(deckData.card_count);
          setTopicId(deckData.topic_id);
          setCategoryId(deckData.category_id);
          setSubcategoryId(deckData.subcategory_id);

          const cardsResponse = await axios.get(
            `https://cardsy.onrender.com/card/list/${deckId.id}`
          );
          setCards(cardsResponse.data);
          // console.log(cardsResponse.data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchDeck();
    }
  }, [edit, deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("dd",(userId));
    const formData = new FormData();
    formData.append("name", name);
    formData.append("level", level);
    formData.append("card_count", cardCount);
    formData.append("topic_id", topicId);
    formData.append("category_id", categoryId);
    formData.append("subcategory_id", subcategoryId);

    const deckData = Object.fromEntries(formData);

    try {
      let deckResponse;
      if (edit === "true") {
        deckResponse = await axios.put(
          `https://cardsy.onrender.com/deck/${deckId.id}`,
          deckData
        );
      } else {
        deckResponse = await axios.post(
          `https://cardsy.onrender.com/deck/${userId}`,
          deckData
        );
      }
      const deckID = deckResponse.data._id;
      // console.log("id",(deckId))
      const newCards = [];
      for (let i = 1; i <= deckData.card_count; i++) {
        const cardData = {
          deck_id: deckID,
          front: cards[i - 1]?.front || "",
          back: cards[i - 1]?.back || "",
        };

        let cardResponse;
        if (edit === "true") {
          const cardId = cards[i - 1]._id; // Get the card ID from the cards state
          console.log("dd", cardId);

          cardResponse = await axios.put(
            `https://cardsy.onrender.com/card/${cardId}`,
            cardData
          );
        } else {
          cardResponse = await axios.post(
            "https://cardsy.onrender.com/card",
            cardData
          );
        }
        newCards.push(cardResponse.data);
        // console.log("Card created:", cardResponse.data);
      }
      setCards(newCards);
      // console.log("Deck created", deckResponse.data);
      alert("Deck created successfully");
     
    } catch (error) {
      console.log(error);
     
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <>
      <Lo />
      <div className="postPage">
        <Search />
        <div>
          <div className="deckIfno">
            <div className="deck-info-first">
              <p className="userdet1">Title:</p>
              <input
                className="deckInput"
                name="name"
                placeholder="The title for your deck"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="userdet1">level:</p>
              <input
                className="deckInput"
                name="level"
                placeholder="The level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
              <p className="userdet1">Cards count:</p>
              <input
                className="deckInput"
                name="card_count"
                placeholder="How many cards?"
                value={cardCount}
                onChange={(e) => setCardCount(e.target.value)}
              />
              <div>
                <button
                  className="deckButton"
                  onClick={edit === "true" ? handleEdit : handleSubmit}
                >
                  {edit === "true" ? "Edit" : "Create"}
                </button>
              </div>
            </div>
            <div className="deck-info-second">
              <div className="username">
                <label className="userdet1">Topic:</label> <br />
                <select
                  id="category"
                  name="topic_id"
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                >
                  <option value="">Select a topic...</option>
                  {topics.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.topic}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="userdet1">Category:</label> <br />
                <select
                  id="category"
                  name="category_id"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
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
                <label className="userdet1">Subcategory:</label> <br />
                <select
                  id="category"
                  name="subcategory_id"
                  value={subcategoryId}
                  onChange={(e) => setSubcategoryId(e.target.value)}
                >
                  <option value="">Select a subcategory...</option>
                  {subcategories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.subcategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <hr className="deckInfoHr" />
          <div className="deck-info-third">
            {Array.from({ length: cardCount }, (_, i) => i + 1).map((index) => (
              <div className="cardsInput-section" key={index}>
                <textarea
                  autoComplete="off"
                  type="text"
                  className="cardTextL"
                  placeholder="Front..."
                  id={`front${index}`}
                  value={cards[index - 1]?.front || ""}
                  onChange={(e) => {
                    const updatedCards = [...cards];
                    if (!updatedCards[index - 1]) {
                      updatedCards[index - 1] = {}; // Create a new empty object if it doesn't exist
                    }
                    updatedCards[index - 1].front = e.target.value;
                    setCards(updatedCards);
                  }}
                />

                <textarea
                  autoComplete="off"
                  type="text"
                  className="cardTextR"
                  placeholder="Back..."
                  id={`back${index}`}
                  value={cards[index - 1]?.back || ""}
                  onChange={(e) => {
                    const updatedCards = [...cards];
                    if (!updatedCards[index - 1]) {
                      updatedCards[index - 1] = {}; // Create a new empty object if it doesn't exist
                    }
                    updatedCards[index - 1].back = e.target.value;
                    setCards(updatedCards);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;

