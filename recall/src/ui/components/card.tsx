import { useContext } from "react";
import logo from "../../assets/logo.png";
import { cardState } from "./context";

interface CardInterface {
  className?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  link: string;
  index: number;
}

export function Card({
  title,
  description,
  image,
  tags,
  type,
  link,
  className,
  index,
}: CardInterface) {
  const [states, setStates] = useContext(cardState);
  const isActive = states[index];

  const handleClick = () => {
    if(isActive){
        setStates(new Array(states.length).fill(false));
    }
    else{
        const newStates = states.map((_, i) => i === index);
    setStates(newStates);
    }
    
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 ${className}`}>
      <div
        className={`bg-white border border-gray-200 shadow-lg transition-transform duration-300 p-4 ${isActive ? "scale-105 shadow-xl" : "scale-100"}`}
        onClick={handleClick}
      >
        {/* Image Section */}
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded-xl transition-all duration-300"
            />
          ) : (
            <img
              src={logo}
              alt="default logo"
              className="w-full h-48 object-cover rounded-xl opacity-60"
            />
          )}
          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-xl`}
          ></div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="text-xl font-semibold text-gray-800 mb-2">{title}</div>

          {!isActive && (
            <div className="flex gap-2 flex-wrap text-sm text-blue-600">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="px-2 py-1 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer transition-all duration-200"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {isActive && (
            <div className="space-y-3">
              <p className="text-sm text-gray-700">{description}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm hover:text-blue-800 transition-colors"
              >
                {link}
              </a>
              <div className="flex gap-2 flex-wrap text-sm text-blue-600">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-2 py-1 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer transition-all duration-200"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
