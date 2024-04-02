import { useEffect, useState } from 'react';
import prisma from '../lib/prisma';
import { Announcement } from '@prisma/client';

const MyComponent = () => {
 const [announce, setAnnounce] = useState<Announcement[]>([]);
 const [tags, setTags] = useState<string[]>([]);
 const [selectedTag, setSelectedTag] = useState('all');

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('/api/getData');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Announcement[] = await res.json();
      setAnnounce(data);

      const uniqueTags = [...new Set(data.map(item => item.tag || ''))];
      setTags(['all', ...uniqueTags]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchData();
 }, []);

 const filteredAnnounce = selectedTag === 'all'
   ? announce
   : announce?.filter((item: any) => item.tag === selectedTag || item.tag === null);

 return (
   <div>
     <div>
       {tags.map((tag) => (
         <button
           key={tag}
           onClick={() => setSelectedTag(tag)}
           style={{
             backgroundColor: selectedTag === tag ? 'blue' : '',
             color: selectedTag === tag ? 'white' : '',
           }}
         >
           {tag}
         </button>
       ))}
     </div>
     <div>
       {filteredAnnounce &&
         filteredAnnounce.map((item: any) =>
          item.publication === 'true'
            ? (
              <div key={item.id}>
                <p>`createDate: ${item.createDate}`</p>
                <p>`tag: ${item.tag || 'No tag'}`</p>
                <p>`title: ${item.title}`</p>
                <p>`content: ${item.content}`</p>
              </div>
            )
            : null
         )}
     </div>
   </div>
 );
};

export default MyComponent;