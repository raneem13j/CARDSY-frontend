import React, { useEffect, useRef, useState } from "react";
import "./Deck.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Lo from "../../Components/Test/Lo";
import Search from "../../Components/Search/search";

function Deck() {
  const userId = sessionStorage.getItem("Id");
  const deckId = useParams();
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [save, setSave] = useState([]);
  const [saved, setSaved] = useState([]);
  const [showBookmarkBorder, setShowBookmarkBorder] = useState(true);
  const [showBookmark, setShowBookmark] = useState(false);
  const [deck, setDeck] = useState([]);
  const [isFollowing, setIsFollowing] = useState("");
  const [unFollow, setUnFollow] = useState([]);
  const [follow, setFollow] = useState([]);


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "70px",
    slidesToShow: 1,
    speed: 500,
    dots: false,
    afterChange: () => setUpdateCount((prevCount) => prevCount + 1),
    beforeChange: (current, next) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: false,
        }
      },
    ]

  };

  useEffect(() => {
    const cardMains = document.querySelectorAll(".card-main");

    const handleClick = (event) => {
      event.currentTarget.classList.toggle("flipped");
    };

    cardMains.forEach((cardMain) => {
      cardMain.addEventListener("click", handleClick);
    });

    cardMains.forEach((cardMain) => {
      cardMain.addEventListener("keypress", handleClick);
    });

    return () => {
      cardMains.forEach((cardMain) => {
        cardMain.removeEventListener("click", handleClick);
      });
      cardMains.forEach((cardMain) => {
        cardMain.removeEventListener("keypress", handleClick);
      });
    };
  }, [cards]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://cardsy.onrender.com/card/list/${deckId.deckId}`
        );
        setCards(response.data);
        setCardCount(response.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [deckId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://cardsy.onrender.com/deck/${deckId.deckId}`
        );
        setDeck(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSliderChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setSlideIndex(newIndex);
    sliderRef.current.slickGoTo(newIndex);
  };

  const sliderRef = useRef(null);

  const handelSavePost = async (e) => {
    // console.log(userId);
    // console.log(deckId.deckId);
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://cardsy.onrender.com/saved/save/${userId}`,
        {
          deck_id: deckId.deckId,
        }
      );
      setSave("sucssful", response.data);

      setShowBookmark((current) => !current);
      setShowBookmarkBorder((current) => !current);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handelUnSavePost = async (e) => {
    // console.log(userId);
    // console.log(deckId.deckId);
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://cardsy.onrender.com/saved/unsave/${userId}`,
        {
          deck_id: deckId.deckId,
        }
      );
      setSave("sucssful", response.data);
      setShowBookmark((current) => !current);
      setShowBookmarkBorder((current) => !current);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // console.log(userId);
      // console.log(deckId.deckId);

      try {
        const response = await axios.get(
          `https://cardsy.onrender.com/saved/list/${userId}`
        );
        setSaved(response.data);
        // console.log(response.data);

        // Check if the saved item exists with the specified userId and deckId
        const isItemSaved = response.data.some(
          (item) =>
            item.user_id._id === userId && item.deck_id._id === deckId.deckId
        );
        // console.log(isItemSaved);
        setShowBookmarkBorder(!isItemSaved);
        setShowBookmark(isItemSaved);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  const fetchFollowersTopic = async () => {
    // console.log(userId);
    try {
      const response = await axios.get(
        `https://cardsy.onrender.com/topicfollower/${userId}`
      );
      const followers = response.data;
      if (deck && deck.topic_id && deck.topic_id._id) {
        setIsFollowing(
          response.data.some((follower) => follower.topic_id._id === deck.topic_id._id)
        );
      }
      // console.log("jjj", deck.topic_id._id)
      // console.log("Followers:", followers);
      // console.log("dd", isFollowing);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollowersTopic();
  }, [follow, unFollow, userId, deck]);


  const handleFollowTopic = async (topicId) =>{
     // console.log("me", userId);

     try {
      const response = await axios.post(
        `https://cardsy.onrender.com/topicfollower/follow/${userId}`,
        {
          topic_id: topicId,
        }
      );
      setFollow("sucssful", response.data);
      setIsFollowing(true);
      // console.log("setfollow ", response.data);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }



  }
  const handleUnFollowTopic = async (topicId) =>{
    
    try {
      const response = await axios.post(
        `https://cardsy.onrender.com/topicfollower/unfollow/${userId}`,
        {
          topic_id: topicId,
        }
      );
      setUnFollow("sucssful", response.data);
      setIsFollowing(false);

      // console.log("setunfollow ", response.data);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }


  }


  const handleFollowState = async (e, topicId) => {
    // console.log(isFollowing);
    // console.log("dssd", topicId)
    e.preventDefault();
    if (isFollowing === true) {
      handleUnFollowTopic(topicId);
    } else {
      handleFollowTopic(topicId);
    }
  };


  return (
    <>
      <Lo />
      <div className="deckPage">
        <Search />
        <div className="deckSection">
          <div>
            <p className="dectName">{deck.name}</p>
            <p className="dectName">{deck.topic_id ? deck.topic_id.topic : null}</p>
            <button className="deckButton" onClick={(e) => handleFollowState(e, deck.topic_id ? deck.topic_id._id : null)}>{isFollowing ? "Following" : "Follow"}</button>
           
          </div>
          <div>
            <BookmarkBorderIcon
              id="bookmark-icon"
              style={{
                color: "#2c6487",
                width: "2.5rem",
                height: "2.5rem",
                display: showBookmarkBorder ? "block" : "none",
              }}
              onClick={(e) => handelSavePost(e)}
            />
            <BookmarkIcon
              id="bookmark-icon"
              style={{
                color: "#f4b31a",
                width: "2.5rem",
                height: "2.5rem",
                display: showBookmark ? "block" : "none",
              }}
              onClick={(e) => handelUnSavePost(e)}
            />
          </div>
          <div className="slik">
            <Slider ref={sliderRef} {...settings}   className="slick-slider">
              {cards.map((card, index) => (
                <div className="cardSection" key={index}>
                  <div className="card-main">
                    <div className="card-front">
                      <p>{card.front}</p>
                    </div>
                    <div className="card-back">
                      <p className="flipped-text">{card.back}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <input
            style={{
              width: "55%",
              height: "10px",
              appearance: "none",
              outline: "none",
              borderRadius: "5px",
              background: "#f4b31a",
            }}
            className="progres-bar"
            onChange={handleSliderChange}
            value={slideIndex}
            type="range"
            min={0}
            max={cardCount - 1}
          />
          <div className="cardCount">
            {slideIndex + 1}/{cardCount}
          </div>
        </div>
      </div>
    </>
  );
}

export default Deck;
