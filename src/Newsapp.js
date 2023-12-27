// src/NewsApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState('publishedAt');
  const [filterBy, setFilterBy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); // Refetch data when startDate or endDate changes

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=apple&from=2023-12-26&to=2023-12-26&sortBy=popularity&apiKey=890337051fea45f28fa44bca8ab54020`
      );

      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterByChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(filterBy.toLowerCase())
  );

  const sortedArticles = filteredArticles.sort((a, b) => {
    const aValue = sortBy === 'publishedAt' ? new Date(a[sortBy]) : a[sortBy];
    const bValue = sortBy === 'publishedAt' ? new Date(b[sortBy]) : b[sortBy];

    return aValue > bValue ? 1 : -1;
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        News App
      </Typography>
      <div>
        <FormControl>
          <InputLabel>Sort by:</InputLabel>
          <Select value={sortBy} onChange={handleSortByChange}>
            <MenuItem value="publishedAt">Date</MenuItem>
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            {/* Add other sorting options if needed */}
          </Select>
        </FormControl>
        <TextField
          label="Filter by"
          variant="outlined"
          value={filterBy}
          onChange={handleFilterByChange}
        />
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <Button variant="contained" onClick={handleSearchClick}>
          Search
        </Button>
      </div>
      <div>
        {sortedArticles.map((article) => (
          <div key={article.title}>
            <Typography variant="h6">{article.title}</Typography>
            <Typography>{article.description}</Typography>
            <Typography>{article.source.name}</Typography>
            <Typography>{article.publishedAt}</Typography>
            <hr />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NewsApp;
