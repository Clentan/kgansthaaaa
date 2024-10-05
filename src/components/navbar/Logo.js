import React from 'react';
import Logo from '../navbar/logoo.jpg'

const User = ({ name, description, avatarSrc }) => {
  return (
    <div className="flex items-center p-4 rounded-lg shadow-lg max-w-xs bg-bodyColor  text-white">
      <img
        src={Logo}
        className="w-16 h-16 rounded-full mr-4 border-2 border-white"
      />
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <User
      name="Kgantsho Gallant"
      description="Graphic Designer"
      avatarSrc="https://i.pravatar.cc/150?u=a04258114e29026702d"
    />
  );
}

