import React, { useState } from "react";
import "./style.css";
import usersData from "./users.json";
interface User {
  users: string[];
}
const MentionComponent = () => {
  const users = usersData.users;
  const [inputValue, setInputValue] = useState<string>("");
  const [mentionList, setMentionList] = useState<string[]>([]);
  const [showMentionList, setShowMentionList] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const lastWord = inputValue.split(" ").pop();

    if (lastWord.startsWith("@")) {
      const query = lastWord.substring(1).toLowerCase();
      const matchingUsers = users.filter((user) =>
        user.toLowerCase().includes(query)
      );
      setInputValue(inputValue);
      setMentionList(matchingUsers);
      setShowMentionList(true);
    } else {
      setInputValue(inputValue);
      setMentionList([]);
      setShowMentionList(false);
    }
  };

  const handleMentionClick = (selectedMention: string) => {
    const updatedInputValue = inputValue.replace(
      /@\w+$/,
      `@${selectedMention} `
    );
    setInputValue(updatedInputValue);
    setMentionList([]);
    setShowMentionList(false);
  };

  return (
    <div className="mention-input centered width_70">
      <textarea
        value={inputValue}
        placeholder="Type a message..."
        onChange={handleInputChange}
        className="  border_grey"
      />
      {showMentionList && (
        <div className="mention-list">
          <ul>
            {mentionList.map((user, index) => (
              <li key={index} onClick={() => handleMentionClick(user)}>
                @{user}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MentionComponent;
