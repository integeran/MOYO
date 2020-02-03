import React from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

const FileMessage = ({ fileName, path }) => {
  const fileDownload = () => {
    firebase
      .storage()
      .ref()
      .child(path)
      .getDownloadURL()
      .then(url => {
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
      })
      .catch(error => {
        console.log('Download Error: ', error);
      });
  };

  return (
    <div>
      <button onClick={fileDownload}>다운로드</button> <br></br>
      <span>파일명: {fileName}</span>
    </div>
  );
};

export default FileMessage;
