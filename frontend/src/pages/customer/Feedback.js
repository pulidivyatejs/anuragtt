import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(rating === 0) {
        toast.error('Please select a rating');
        return;
    }
    toast.success('Thank you for your feedback!');
    setRating(0);
    setComment('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Rate Your Delivery</h2>
      <p className="text-gray-500 mb-8">How was your experience with order ORD-1001?</p>
      
      <div className="flex justify-center space-x-2 mb-8">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`background-transparent border-none outline-none cursor-pointer transition ${
                index <= (hover || rating) ? 'text-yellow-400' : 'text-gray-200'
              }`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <Star className="w-16 h-16 fill-current" />
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea 
          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 resize-none h-32" 
          placeholder="Tell us about your experience... (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button 
          type="submit" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-12 rounded-full transition shadow-md"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
