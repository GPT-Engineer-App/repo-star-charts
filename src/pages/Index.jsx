import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Index = () => {
  const [repo1, setRepo1] = useState('');
  const [repo2, setRepo2] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const fetchStars = async () => {
    if (!repo1 || !repo2) {
      throw new Error('Please enter both repository URLs');
    }
    const response = await axios.post('http://localhost:3000/fetch-stars', 
      { repo1, repo2 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

  const { data, refetch, isLoading, isError } = useQuery(['stars'], fetchStars, {
    enabled: false,
  });

  const handleFetchStars = () => {
    setError('');
    refetch();
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setToken(response.data.accessToken);
      localStorage.setItem('token', response.data.accessToken);
      setError('');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/register', { username, password });
      setError('');
      handleLogin();
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const formatChartData = (data) => {
    if (!data) return [];
    const repo1Data = data.repo1 || [];
    const repo2Data = data.repo2 || [];
    
    const allDates = [...new Set([...repo1Data.map(d => d.date), ...repo2Data.map(d => d.date)])].sort();
    
    return allDates.map(date => ({
      date: new Date(date).toLocaleDateString(),
      [repo1]: repo1Data.find(d => new Date(d.date).toLocaleDateString() === new Date(date).toLocaleDateString())?.count || null,
      [repo2]: repo2Data.find(d => new Date(d.date).toLocaleDateString() === new Date(date).toLocaleDateString())?.count || null,
    }));
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Login or Register</h2>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleLogin} className="mr-2">Login</Button>
          <Button onClick={handleRegister}>Register</Button>
          {error && <Alert className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">GitHub Stars Comparison</h1>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter first repo URL"
            value={repo1}
            onChange={(e) => setRepo1(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Enter second repo URL"
            value={repo2}
            onChange={(e) => setRepo2(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleFetchStars} disabled={isLoading}>
            {isLoading ? 'Fetching...' : 'Fetch Stars'}
          </Button>
          <Button onClick={handleLogout} className="ml-2">Logout</Button>
        </div>
        
        {isError && <Alert><AlertTitle>Error</AlertTitle><AlertDescription>Failed to fetch data. Please try again.</AlertDescription></Alert>}
        
        {data && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={formatChartData(data)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={repo1} stroke="#8884d8" />
                <Line type="monotone" dataKey={repo2} stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
