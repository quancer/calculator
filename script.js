function createTag(tagName, tagClass) {
  const tag = document.createElement(`${tagName}`);
  tag.setAttribute("class", `${tagClass}`);
  return tag;
}

const header = createTag("div", "head");
console.log(header);
