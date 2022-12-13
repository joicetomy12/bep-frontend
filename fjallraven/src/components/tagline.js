import React from 'react';
const Tagline = ({ tagline }) => {
  return (
    <>
      {tagline &&
        tagline.length > 0 &&
        tagline.length > 0 &&
        tagline.map((line, index) => {
          let markDefs = line.markDefs.href ? line.markDefs.href : '';
          return (
            <span key={index}>
              {line.children.map((lineChild, indexInner) => (
                <span key={indexInner}>
                  {indexInner != 1 && lineChild.text}
                  {indexInner == 1 && (
                    <a
                      className="goglos"
                      href={`${
                        markDefs.includes('http')
                          ? markDefs
                          : 'https://www.instagram.com/fjallravenofficial/' +
                            markDefs
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {lineChild.text}
                    </a>
                  )}
                  <br />
                </span>
              ))}
            </span>
          );
        })}
    </>
  );
};

export default Tagline;
