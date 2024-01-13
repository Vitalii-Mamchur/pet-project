import React, {createContext, useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getItems} from '../store/itemsSlice';
import {getCategories} from '../store/categorySlice';
import {getColors} from '../store/colorsSlice';

import {useLocation, useNavigate} from 'react-router-dom';
import queryString from 'query-string';

import PropTypes from 'prop-types';

const DataCatalogueContext = createContext(null);

const STATUS_KEYS = ['new', 'sale'];
const INITIAL_FILTERS = {
  category: [],
  size: [],
  color: [],
  availability: [],
  status: [],
};

export const ShopPageMasterProvider = ({children}) => {
  const items = useSelector(getItems());
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();
  const categories = useSelector(getCategories());
  const colors = useSelector(getColors());
  const [isFilter, setIsFilter] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedFilters, setSelectedFilters] = useState(INITIAL_FILTERS);
  const [statusKey, setStatusKey] = useState(query.status);

  const changeIsFilter = () => {
    setIsFilter((prevValue) => !prevValue);
  };

  const onSortItems = (sortOrder) => {
    let sortedItems = [];
    if (sortOrder === 'lowToHigh') {
      sortedItems = filteredItems.toSorted((a, b) => a.price - b.price);
      setFilteredItems(sortedItems);
    }
    if (sortOrder === 'highToLow') {
      sortedItems = filteredItems.toSorted((a, b) => b.price - a.price);
      setFilteredItems(sortedItems);
    }
    if (sortOrder === 'best') {
      sortedItems = items.filter((item) => item.status === 'sold-out');
      setFilteredItems(sortedItems);
    }
    if (sortOrder === 'new') {
      sortedItems = items.filter((item) => item.status === 'new');
      setFilteredItems(sortedItems);
    }
  };

  const handleFilterChange = (categoryType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [categoryType]: prevFilters[categoryType].includes(value) ?
        prevFilters[categoryType].filter((item) => item !== value) :
        [...prevFilters[categoryType], value],
    }));
  };

  const handleCleanFilter = () => {
    setSelectedFilters(INITIAL_FILTERS);
  };

  useEffect(() =>{
    setStatusKey(query.status);
  }, [location.search]);

  useEffect(() => {
    if (!STATUS_KEYS.includes(statusKey) || query.status === undefined) {
      navigate('.');
      setStatusKey(undefined);
      setFilteredItems(items);
    } else if (items) {
      setFilteredItems(() => items.filter((item) => item.status === statusKey));
    }
  }, [statusKey, navigate]);

  useEffect(() => {
    if (items) {
      const newItems = items.filter((item) => {
        return (
          (selectedFilters.category.length === 0 ||
          selectedFilters.category.some((category) =>
            item.category.includes(category),
          )) &&
        (selectedFilters.size.length === 0 ||
          selectedFilters.size.some((size) => item.size.includes(size))) &&
        (selectedFilters.color.length === 0 ||
          selectedFilters.color.some((color) => item.color.includes(color))) &&
        (selectedFilters.status.length === 0 ||
          selectedFilters.status.some((status) =>
            item.status.includes(status),
          ))
        );
      });
      setStatusKey(undefined);
      setFilteredItems(newItems);
    }
  }, [selectedFilters, items]);


  return (
    <DataCatalogueContext.Provider
      value={{
        isFilter,
        filteredItems,
        categories,
        colors,
        selectedFilters,
        setSelectedFilters,
        changeIsFilter,
        onSortItems,
        handleFilterChange,
        handleCleanFilter,
      }}
    >
      {children}
    </DataCatalogueContext.Provider>
  );
};

export const useDataShopPage = () => {
  const data = useContext(DataCatalogueContext);
  if (!data) {
    throw new Error(
        'Can not "useData" outside of the "ShopPageMasterProvider"',
    );
  }
  return data;
};

ShopPageMasterProvider.propTypes = {
  children: PropTypes.element,
};