import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '../logo.svg';
export default function Home() {

  const state = useSelector(state => state);
  
  useEffect(() => {
    console.log(state);
  }, [])

  return (
    <>
    </>
  )
}