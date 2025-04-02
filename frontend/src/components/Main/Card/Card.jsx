import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function Card(props) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  const isLiked =
    props.card.likes && props.card.likes.some((id) => id === currentUser._id);

  const likesCount = props.card.likes ? props.card.likes.length : 0;

  function handleClick() {
    props.onCardClick(props.card);
  }
  const cardLikeButtonClassName = `content__description-like ${
    isLiked ? "content__description-like-focus" : ""
  }`;
  console.log(props.card);
  function handleLike() {
    props.onLikeClick(props.card);
  }

  function handleDelete() {
    props.onEditDeleteTrashclick(props.card);
  }

  return (
    <div
      className="content__element content__element-template"
      id="card-element"
    >
      <div className="content__space-image">
        <img
          onClick={handleClick}
          src={props.card.link}
          alt="Places"
          className="content__element-picture"
        />
      </div>
      <div className="content__description">
        <p className="content__description-text">{props.card.name}</p>
        <div className="content__likes">
          <button
            onClick={handleLike}
            className={cardLikeButtonClassName}
          ></button>
          <p className="content__like-number">{likesCount}</p>
        </div>
      </div>
      {(props.card.owner && typeof props.card.owner === "string"
        ? props.card.owner === currentUser?._id
        : props.card.owner._id === currentUser?._id) && (
        <button onClick={handleDelete} className="content__bin"></button>
      )}
    </div>
  );
}

export default Card;
