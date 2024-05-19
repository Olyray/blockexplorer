import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlockList({ alchemy }) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const latest = await alchemy.core.getBlockNumber();
      const blockNumbers = Array.from({length: 10}, (_, i) => latest - i);
      const blockPromises = blockNumbers.map(number => alchemy.core.getBlock(number));
      const blocksData = await Promise.all(blockPromises);
      setBlocks(blocksData);
    };

    fetchBlocks();
  }, [alchemy]);

  return (
    <div>
      <h2>Recent Blocks</h2>
      {blocks.map(block => (
        <Link key={block.number} to={`/block/${block.number}`}>
          <div>Block {block.number}</div>
        </Link>
      ))}
    </div>
  );
}

export default BlockList;
