import iconImg from "assets";

export const handleGenerateTitleReaction = (data) => {
  switch (data) {
    case "satisfaction":
      return <p className="text-[#498ae6]">Like</p>;
    case "love":
      return <p className="text-[#e64949]">Love</p>;
    case "happy":
      return <p className="text-[#d3df58]">Happy</p>;
    case "surprise":
      return <p className="text-[#d3df58]">Surprise</p>;
    case "sad":
      return <p className="text-[#d3df58]">Sad</p>;
    case "angry":
      return <p className="text-[#e64949]">Angry</p>;
    default:
      return <p>Reaction</p>;
  }
};

export const handleShowReactionOfComment = (type) => {
  switch (type) {
    case "happy":
      return iconImg.lolImg;
    case "satisfaction":
      return iconImg.likeImg;
    case "love":
      return iconImg.loveImg;
    case "surprise":
      return iconImg.wowImg;
    case "sad":
      return iconImg.sadImg;
    case "angry":
      return iconImg.angryImg;
    default:
      return "";
  }
};
export const handleFilterReactionOfComment = (dataReaction, comment) => {
  const result = dataReaction?.reaction?.filter((data) => {
    return data?.id_comment === comment?.id_comment;
  });
  return result;
};
export const handleFilterReactionOfReply = (dataReplyReaction, reply) => {
  const result = dataReplyReaction?.reaction_reply?.filter((data) => {
    return data?.id_reply === reply?.id_reply;
  });
  return result;
};
