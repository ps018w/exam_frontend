import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../Feature/categoriesSlice';
import Template from './Template';
import LodingForLogin from '../login/LodingForLogin';
import { useParams } from 'react-router-dom';

function TemplateView() {
  const { id } = useParams();
  return (
    <div>
      <Template categoryId={id} />
    </div>
  );
}

export default TemplateView;
