import folder from "../../assets/icons/folder.svg";

import Tags from "../Buttons/Tags";

function Categories() {
  return (
    <div className="flex flex-row justify-between m-6">
      <Tags name="Tout" />
      <img src={folder} alt="folder" />
    </div>
  );
}

export default Categories;
