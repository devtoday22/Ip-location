import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchForm from './components/SearchForm';
import InfoCard from './components/InfoCard';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const MapComponent = dynamic(
  () => import('./components/MapComponent'),
  { ssr: false }
);

export default function Home() {
  const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get IP
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        await fetchData(ip);
      } catch (err) {
        setError('Error with initial information.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    await fetchData(query);
    setIsLoading(false);
  };

  const fetchData = async (query) => {
    try {
      // IPify API
      const apiKey = 'at_xfIyD4TVRwePDfn1G6DjD0X15ciGH';
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${query ? `ipAddress=${query}&domain=${query}` : ''}`);
      const data = await response.json();

      if (data.code) {
        setError(data.messages);
        setIpAddress('');
        setLocation('');
        setTimezone('');
        setIsp('');
        setCoordinates({ lat: 0, lng: 0 });
        return;
      }

      setIpAddress(data.ip);
      setLocation(`${data.location.city}, ${data.location.region} ${data.location.postalCode}`);
      setTimezone(`UTC ${data.location.timezone}`);
      setIsp(data.isp);
      console.log('Home: API response coordinates', { lat: data.location.lat, lng: data.location.lng });
      setCoordinates({ lat: parseFloat(data.location.lat), lng: parseFloat(data.location.lng) });
    } catch (err) {
      setError('Error with founding information.');
      setIpAddress('');
      setLocation('');
      setTimezone('');
      setIsp('');
      setCoordinates({ lat: 0, lng: 0 });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>IP Address Tracker</title>
        <meta name="description" content="IP Address Tracker App" />
        <link rel="icon" href="/favicon.ico" />
        {/* Leaflet CSS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-eYAApulLErYJnH/ejSmKTwjOjAKbyuy69EC7ULmUCykYAZH6zjPQY0kJgf6CUFIBZAYoZevIYmu1c/UdKsdQ=="
          crossOrigin=""/>
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>IP Address Tracker</h1>
        <SearchForm onSearch={handleSearch} />
      </header>

      <main className={styles.main}>
        <InfoCard
          ipAddress={ipAddress}
          location={location}
          timezone={timezone}
          isp={isp}
          loading={isLoading}
          error={error}
        />
        {console.log('Home: coordinates before MapComponent render', coordinates)}
        {coordinates.lat !== 0 && coordinates.lng !== 0 && (
          <MapComponent position={[coordinates.lat, coordinates.lng]} zoom={13} />
        )}
      </main>
    </div>
  );
}