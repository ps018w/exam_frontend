// import React, { useEffect, useState } from 'react';
// import Template from './Template';
// import axios from 'axios';

// function TemplateView(){
//   const [getCategories, setGetCategories] = useState([]);

//   const getCategory = () => {
//     axios
//       .get('http://44.221.201.10/api/categories')
//       .then((res) => {
//         setGetCategories(res.data);
//       })
//       .catch((error) => {
//           console.log('error', error);
//         });
//   };

//   useEffect(() => {
//     getCategory();
//   }, []);
//   // console.log('line 23==>>', getCategories);
//   return (
//     <div>{getCategories && <Template categoryId={getCategories[0]?.id} />}</div>
//   );
// }

// export default TemplateView;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../Feature/categoriesSlice";
import Template from "./Template";
import LodingForLogin from "../login/LodingForLogin";

function TemplateView() {
  // const categories = useSelector(selectCategories);
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.getCategory,
  );

  // console.log(categories)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // console.log("xyz", categories, loading, error )

  if (loading) {
    return (
      <div>
        <LodingForLogin />
      </div>)
      ;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      {categories.length > 0 && <Template categoryId={categories[0]?.id} />}
    </div>
  );
}

export default TemplateView;