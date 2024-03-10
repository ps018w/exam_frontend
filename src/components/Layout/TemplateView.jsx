import React, { useEffect, useState } from 'react';
import Template from './Template';
import axios from 'axios';

function TemplateView() {
  const [getCategories, setGetCategories] = useState([]);

  const getCategory = () => {
    axios
      .get('http://educomet.com.au/api/categories')
      .then((res) => {
        setGetCategories(res.data);
        // console.log('line 10==>>', res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);
  // console.log('line 23==>>', getCategories);
  return (
    <div>{getCategories && <Template categoryId={getCategories[0]?.id} />}</div>
  );
}

export default TemplateView;
