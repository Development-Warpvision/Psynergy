import React, { useEffect } from 'react'
import getCookieValue from '../utils/getCookie'
import axios from 'axios'
const Facbook = () => {
    const fbCOk = getCookieValue('token')
    const id = getCookieValue('facebookid')
    const fb = getCookieValue('fb')
    useEffect(() => {
        const fetchData = async () => {
          const url = 'http://localhost:5000/api/v1/meta/getmsg';
          const msgPlatform = 'messenger';
    
          try {
            const response = await axios.get(url, {
              params: { msgPlatform },
              headers: {
                Cookie:
                  `token= ${fbCOk}`  +
                  `facebookid=${id}` +
                  `facebook=EAAJFNt1lb24BO5APkZAp2uxZCx1hyBVNklRZCtCZCBZB9lvZAqPeETW09NHw76LKYnZA1kcs40LYpQESJKyS7wRGC2FVoBGHmnRwO4aJBeHMrgwMWgRZAi9TTgYwM32Txk4MdXGPZCTvALtvv959aV6TJUHbVrDMcmZCVZAbRZCnJeKHnLYSVLsYc3tbjhlaeIZBdOEcrZBN5fPacOV6Jn5Dj3LwMV4yoPjXJfadrZC0GndiwYZD`,
              },
            });
    
            // Process the response data as needed
            console.log(response.data);
          } catch (error) {
            console.error(error);
            // Handle the error
          }
        };
    
        fetchData();
      }, []); 
  return (
    <div>Facbook</div>
  )
}

export default Facbook