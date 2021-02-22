import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '../logo.svg';
import HomeIndex from '../components/home/HomeIndex';
export default function Home() {

  const state = useSelector(state => state);
  
  useEffect(() => {
    console.log(state);
  }, [])

  return (
    <>
    <HomeIndex />
    </>
  )
}