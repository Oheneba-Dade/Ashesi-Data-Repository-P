import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import CustomButton from "@/components/CustomButton";

const ratings = [
  { id: 1, name: "Cabby Koko", rating: 4, comment: "sciunt. Neque porro quisquam est, qui Sed ut perspiciatis unde omnis iste natus error sit voluptatem !!", date: "4 - 12 - 2023" },
  { id: 2, name: "Taller Koko", rating: 4.5, comment: "This is a nice collection tatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur", date: "4 - 12 - 2023" },
  { id: 3, name: "Momsi Koko", rating: 3, comment: "Amazing tatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos !", date: "4 - 12 - 2023" },
];

export default function Reviews({rating=5, comments=""}) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <AiFillStar key={i} className="text-xl" />
        ))}
        {halfStar && <AiFillStar className="text-xl" style={{ clipPath: "inset(0 50% 0 0)" }} />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <AiOutlineStar key={i} className="text-xl" />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Overall Rating */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <p className="text-2xl font-bold text-ashesi-red mr-2">4.5</p>
          {renderStars(rating)}
        </div>
        <CustomButton
            text=" LOGIN TO MAKE A COMMENT"
            bgColor = "bg-white"
            textColor = "text-ashesi-red"
            onClick={() => alert("Login!")}
            width = "w-auto"
            height = "h-10"
            className="text-sm !font-medium border border-ashesi-red px-4 py-2 px-4 hover:bg-ashesi-red hover:text-white"        
        />
      </div>

      <hr className="my-3" />

      {/* User Reviews */}
      <div>
        {ratings.map((review) => (
          <div key={review.id} className="py-4 border-b">
            <div className="flex items-start gap-6">
              <div className="flex flex-1 flex-col">
                <p className="font-semibold text-md">{review.name}</p>
                <div className="flex items-center gap-2">{renderStars(review.rating)}</div>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            
              <p className="text-gray-700 w-4/5">{comments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
