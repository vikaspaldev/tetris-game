const createScriptTag = ({ src, onScriptLoad }) => {
  const scriptTag = document.createElement("script");

  scriptTag.src = src;
  scriptTag.onload = onScriptLoad;

  return scriptTag;
};

const appendScriptsToBody = scripts => {
  const documentFragment = document.createDocumentFragment();

  scripts.forEach(script => {
    documentFragment.appendChild(script);
  });

  document.body.appendChild(documentFragment);
};

export const domUtils = {
  createScriptTag,
  appendScriptsToBody,
};
