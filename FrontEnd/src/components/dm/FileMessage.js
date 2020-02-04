import React from 'react';

const FileMessage = ({ fileName, url }) => {
  const fileDownload = () => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var a = document.createElement('a');
      var blob = xhr.response;
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      // delete a;
    };
    xhr.open('GET', url);
    xhr.send();
    alert('다운로드가 완료되었습니다.');
  };

  const extensionCheck = () => {
    var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (
      extension.toLowerCase() === 'jpg' ||
      extension.toLowerCase() === 'png'
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {extensionCheck() ? (
        <img alt="미리보기" src={url}></img>
      ) : (
        <button onClick={fileDownload}>다운로드</button>
      )}
      {extensionCheck() === false && <br></br>}
      {extensionCheck() === false && <span>파일명: {fileName}</span>}
    </div>
  );
};

export default FileMessage;
