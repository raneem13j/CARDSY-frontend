import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import follo from "../../Images/icons8-new-48.png";
import like from "../../Images/icons8-like-50.png";
import deck from "../../Images/icons8-card-30.png";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Lo from "../../Components/Test/Lo";
import Search from "../../Components/Search/search";

function Home() {
  const userId = sessionStorage.getItem("Id");
  const [user, setUser] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [decks, setDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([decks]);
  const [hasFilters, setHasFilters] = useState(false);
  const [vote, setVote] = useState([]);
  const [latest, setLatest] = useState([]);
  const [order, setOrder] = useState([]);
  const [latestMode, setLatestMode] = useState(false);
  const [orderMode, setOrderMode] = useState(false);
  const [postMode, setPostMode] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://cardsy.onrender.com/user/${userId}`
        );
        setUser(response.data);
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
        const response = await axios.get("https://cardsy.onrender.com/topic");
        setTopics(response.data);
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
        // console.log("sub", subcategories)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://cardsy.onrender.com/deck/all/${userId}`
        );
        setDecks(response.data);
        // console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSubcategory || selectedCategory || selectedTopic) {
      setHasFilters(true);
    } else {
      setHasFilters(false);
    }

    if (selectedSubcategory) {
      // Filter by subcategory
      const filteredDecksBySubcategory = decks.filter(
        (deck) =>
          deck.subcategory_id._id === selectedSubcategory &&
          deck.category_id._id ===
            (selectedCategory ? selectedCategory : deck.category_id._id) &&
          deck.topic_id._id ===
            (selectedTopic ? selectedTopic : deck.topic_id._id)
      );
      setFilteredDecks(filteredDecksBySubcategory);
    } else if (selectedCategory) {
      // Filter by category
      const filteredDecksByCategory = decks.filter(
        (deck) =>
          deck.category_id._id === selectedCategory &&
          deck.topic_id._id ===
            (selectedTopic ? selectedTopic : deck.topic_id._id)
      );
      setFilteredDecks(filteredDecksByCategory);
    } else if (selectedTopic) {
      // Filter by topic
      const filteredDecksByTopic = decks.filter(
        (deck) => deck.topic_id._id === selectedTopic
      );
      setFilteredDecks(filteredDecksByTopic);
    } else {
      // No filters selected, show all decks
      setFilteredDecks(decks);
    }
  }, [selectedTopic, selectedCategory, selectedSubcategory, decks]);

  const handleTopicSelect = (topicId) => {
    // console.log(topicId);
    setSelectedTopic(topicId);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleCategorySelect = (categoryId, topicId) => {
    // console.log("cat", categoryId);
    // console.log("t", topicId);
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSelectedTopic(topicId);
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const filteredCategories = categories.filter(
    (category) => category.topic_id._id === selectedTopic
  );

  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category_id._id === selectedCategory
  );

  const topicOptions = topics.map((topic) => (
    <li
      className="li-map"
      key={topic._id}
      onClick={() => handleTopicSelect(topic._id)}
    >
      {topic.topic}
    </li>
  ));

  const categoryOptions = filteredCategories.map((category) => (
    <li
      className="li-map"
      key={category._id}
      onClick={() => handleCategorySelect(category._id, category.topic_id._id)}
    >
      {category.category}
    </li>
  ));

  const subcategoryOptions = filteredSubcategories.map((subcategory) => (
    <li
      className="li-map"
      key={subcategory._id}
      onClick={() => handleSubcategorySelect(subcategory._id)}
    >
      {subcategory.subcategory}
    </li>
  ));

  const handleThumbUpClick = async (e, deckId, voteType) => {
    e.preventDefault();
    // console.log(userId);
    // console.log(deckId);
    // console.log(voteType);

    if (voteType === "down" && voteType !== "up") {
      try {
        const response = await axios.delete(
          `https://cardsy.onrender.com/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.post(
          `https://cardsy.onrender.com/vote/${userId}`,
          {
            deck_id: deckId,
            voteType: "up",
          }
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType !== "up" && voteType !== "down") {
      try {
        const response = await axios.post(
          `https://cardsy.onrender.com/vote/${userId}`,
          {
            deck_id: deckId,
            voteType: "up",
          }
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType === "up") {
      try {
        const response = await axios.delete(
          `https://cardsy.onrender.com/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    try {
      const response = await axios.get(
        `https://cardsy.onrender.com/deck/all/${userId}`
      );
      setDecks(response.data);
      // console.log("decks", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleThumbDownClick = async (e, deckId, voteType) => {
    e.preventDefault();
    // console.log(userId);
    // console.log(deckId);
    // console.log(voteType);

    if (voteType === "up" && voteType !== "down") {
      try {
        const response = await axios.delete(
          `https://cardsy.onrender.com/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.post(
          `https://cardsy.onrender.com/vote/${userId}`,
          {
            deck_id: deckId,
            voteType: "down",
          }
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType !== "down" && voteType !== "up") {
      try {
        const response = await axios.post(
          `https://cardsy.onrender.com/vote/${userId}`,
          {
            deck_id: deckId,
            voteType: "down",
          }
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType === "down") {
      try {
        const response = await axios.delete(
          `https://cardsy.onrender.com/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    try {
      const response = await axios.get(
        `https://cardsy.onrender.com/deck/all/${userId}`
      );
      setDecks(response.data);
      // console.log("decks", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleListPost = async () => {
    setLatestMode(false);
    setOrderMode(false);
    setPostMode(true);
  };

  const handleListLatest = async () => {
    setLatestMode(true);
    setOrderMode(false);
    setPostMode(false);
    try {
      const response = await axios.get(
        `https://cardsy.onrender.com/deck/latest/${userId}`
      );
      setLatest(response.data);
      // console.log("decks", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleListOrder = async () => {
    setLatestMode(false);
    setOrderMode(true);
    setPostMode(false);
    try {
      const response = await axios.get(`https://cardsy.onrender.com/vote/order`);
      setOrder(response.data);
      // console.log("decks", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Lo />
      <div className="homePage">
        <Search />
        <div className="homeHeader">
          <div className="profil-minisection">
            <h3 className="profil-headline">{user.username}</h3>
            <hr className="hr1" />
            <div className="pro-info">
              <div className="profil-content">
                <img className="img_dashboard" src={follo} alt="" />
                <div className="">
                  <button
                    className="profil-contentButton"
                    onClick={handleListLatest}
                  >
                    The Latest
                  </button>
                </div>
              </div>
              <hr className="hr2" />
              <div className="profil-content">
                <img className="img_dashboard" src={deck} alt="" />
                <div className="">
                  <button
                    className="profil-contentButton"
                    onClick={handleListPost}
                  >
                    Posts
                  </button>
                </div>
              </div>
              <hr className="hr2" />
              <div className="profil-content">
                <img className="img_dashboard" src={like} alt="" />
                <div className="">
                  <button
                    className="profil-contentButton"
                    onClick={handleListOrder}
                  >
                    Most Voted
                  </button>
                </div>
              </div>
              <hr className="hr2" />
            </div>
          </div>
          <div className="homeFilter">
            <div className="H-filter">
              <div className="filter-section">
                <ul className="filter-list">
                  <li className="li-filter">Topics: </li>
                  <button
                    className="clear-filters-button"
                    onClick={() => {
                      setSelectedTopic(null);
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    }}
                  >
                    All
                  </button>

                  {topicOptions}
                </ul>
              </div>
              <div className="filter-section">
                <ul className="filter-list">
                  <li className="li-filter">Categories:</li>
                  {categoryOptions}
                </ul>
              </div>
              <div className="filter-section">
                <ul className="filter-list">
                  <li className="li-filter">Subcategories:</li>
                  {subcategoryOptions}
                </ul>
              </div>
            </div>
            <div className="head">
              <h2>Posts</h2>
              <hr />
            </div>

            <div id="H-content">
              <div className="profil-and-posts">
                {postMode && (
                  <div className="posts-section">
                    {filteredDecks.length === 0 ? (
                      <div className="no-decks-message">
                        There are no decks here.
                      </div>
                    ) : (
                      filteredDecks.map((deck, i) => (
                        <div className="card-section" key={i}>
                          <Card
                          id="home"
                            key={deck.id}
                            sx={{
                              minWidth: 275,
                              width: "100%",
                              height: 155,
                              boxShadow: "6px 6px 6px rgb(150, 150, 150)",
                            }}
                          >
                            <CardContent key={deck.id}>
                              <Typography
                                style={{ color: "#2c6487" }}
                                variant="h5"
                                component="div"
                                key={deck.id}
                              >
                                {deck.name}
                              </Typography>
                              <Typography variant="body2">
                                {deck.level}
                              </Typography>
                              <Link
                                className="cardLink"
                                to={`/profil/${
                                  deck.user_id !== undefined
                                    ? deck.user_id.username
                                    : null
                                }`}
                              >
                                <Typography variant="body2">
                                  {deck.user_id !== undefined
                                    ? deck.user_id.username
                                    : null}
                                </Typography>
                              </Link>
                              <Typography variant="body2">
                                {deck.card_count} Cards
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Link
                                className="cardLink"
                                to={`/deck/${deck._id}`}
                              >
                                <Button size="small">Test your self</Button>
                              </Link>
                              <IconButton
                                aria-label="like"
                                onClick={(e) =>
                                  handleThumbUpClick(e, deck._id, deck.voteType)
                                }
                              >
                                <ThumbUpIcon
                                  style={{
                                    color:
                                      deck.voteType === "up"
                                        ? "#f4b31a"
                                        : deck.voteType === "down"
                                        ? "#2c6487"
                                        : "rgb(44, 100, 135)",
                                  }}
                                />
                              </IconButton>
                              <IconButton
                                aria-label="like"
                                onClick={(e) =>
                                  handleThumbDownClick(
                                    e,
                                    deck._id,
                                    deck.voteType
                                  )
                                }
                              >
                                <ThumbDownIcon
                                  style={{
                                    color:
                                      deck.voteType === "down"
                                        ? "#f4b31a"
                                        : deck.voteType === "up"
                                        ? "#2c6487"
                                        : "rgb(44, 100, 135)",
                                  }}
                                />
                              </IconButton>
                            </CardActions>
                          </Card>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {latestMode && (
                  <div className="posts-section">
                    {latest.map((deck, i) => (
                      <div className="card-section" key={i}>
                        <Card
                          key={i}
                          sx={{
                            minWidth: 275,

                            width: 800,
                            height: 155,
                            boxShadow: "6px 6px 6px rgb(150, 150, 150)",
                          }}
                        >
                          <CardContent key={deck.id}>
                            <Typography
                              style={{ color: "#2c6487" }}
                              variant="h5"
                              component="div"
                              key={deck.id}
                            >
                              {deck.name}
                            </Typography>
                            <Typography variant="body2">
                              {deck.level}
                            </Typography>
                            <Link
                              className="cardLink"
                              to={`/profil/${
                                deck.user_id !== undefined
                                  ? deck.user_id.username
                                  : null
                              }`}
                            >
                              <Typography variant="body2">
                                {deck.user_id !== undefined
                                  ? deck.user_id.username
                                  : null}
                              </Typography>
                            </Link>
                            <Typography variant="body2">
                              {deck.card_count} Cards
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Link className="cardLink" to={`/deck/${deck._id}`}>
                              <Button size="small">Test your self</Button>
                            </Link>
                            <IconButton
                              aria-label="like"
                              onClick={(e) =>
                                handleThumbUpClick(e, deck._id, deck.voteType)
                              }
                            >
                              <ThumbUpIcon
                                style={{
                                  color:
                                    deck.voteType === "up"
                                      ? "#f4b31a"
                                      : deck.voteType === "down"
                                      ? "#2c6487"
                                      : "rgb(44, 100, 135)",
                                }}
                              />
                            </IconButton>
                            <IconButton
                              aria-label="like"
                              onClick={(e) =>
                                handleThumbDownClick(e, deck._id, deck.voteType)
                              }
                            >
                              <ThumbDownIcon
                                style={{
                                  color:
                                    deck.voteType === "down"
                                      ? "#f4b31a"
                                      : deck.voteType === "up"
                                      ? "#2c6487"
                                      : "rgb(44, 100, 135)",
                                }}
                              />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}

                {orderMode && (
                  <div className="posts-section">
                    {order.map((deck, i) => (
                      <div className="card-section" key={i}>
                        <Card
                          key={i}
                          sx={{
                            minWidth: 275,
                            width: 800,
                            height: 155,
                            boxShadow: "6px 6px 6px rgb(150, 150, 150)",
                          }}
                        >
                          <CardContent key={deck.id}>
                            <Typography
                              style={{ color: "#2c6487" }}
                              variant="h5"
                              component="div"
                              key={deck.id}
                            >
                              {deck.name}
                            </Typography>
                            <Typography variant="body2">
                              {deck.level}
                            </Typography>
                            <Link
                              className="cardLink"
                              to={`/profil/${
                                deck.username !== undefined
                                  ? deck.username
                                  : null
                              }`}
                            >
                              <Typography variant="body2">
                                {deck.username !== undefined
                                  ? deck.username
                                  : null}
                              </Typography>
                            </Link>
                            <Typography variant="body2">
                              {deck.card_count} Cards
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Link className="cardLink" to={`/deck/${deck._id}`}>
                              <Button size="small">Test your self</Button>
                            </Link>
                            <IconButton
                              aria-label="like"
                              onClick={(e) =>
                                handleThumbUpClick(e, deck._id, deck.voteType)
                              }
                            >
                              <ThumbUpIcon
                                style={{
                                  color:
                                    deck.voteType === "up"
                                      ? "#f4b31a"
                                      : deck.voteType === "down"
                                      ? "#2c6487"
                                      : "rgb(44, 100, 135)",
                                }}
                              />
                            </IconButton>
                            <IconButton
                              aria-label="like"
                              onClick={(e) =>
                                handleThumbDownClick(e, deck._id, deck.voteType)
                              }
                            >
                              <ThumbDownIcon
                                style={{
                                  color:
                                    deck.voteType === "down"
                                      ? "#f4b31a"
                                      : deck.voteType === "up"
                                      ? "#2c6487"
                                      : "rgb(44, 100, 135)",
                                }}
                              />
                            </IconButton>
                            <Typography id="MLI" variant="body2">
                              {deck.totalUps}
                              <FavoriteIcon style={{ color: "#2c6487" }} />
                            </Typography>
                          </CardActions>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Home;
