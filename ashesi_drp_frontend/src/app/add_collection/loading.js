import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../globals.css";

export default function Card() {
  return (
        // <Skeleton width={700} height={150} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
    
        <form className="container mx-auto mt-32 px-48">
        <section className="my-16">
            <h2  className="text-center">
                <Skeleton width="40%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8"/>
            </h2>
            <hr className="my-4" />

            {/* Input Group 1 */}
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="title" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={400} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="title" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={700} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>

            {/* Input Group 2 */}
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="title" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={400} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
            
            {/* Input Group 3 */}
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="title" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={400} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
        </section>

        <section className="my-16">
            <h2 className="text-3xl font-semibold text-center text-ashesi-red">
                <Skeleton width="40%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </h2>
            <hr className="my-4" />
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="abstract" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={800} height={150} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
            <div className="flex items-center justify-left gap-4 mb-8">
                <label
                    htmlFor="dataset-represent"
                    className="w-40 text-left"
                >
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={800} height={150} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="missing-values" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={100} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
        </section>
        <section className="my-16">
            <h2 className="text-3xl font-semibold text-center text-ashesi-red">
                <Skeleton width="40%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </h2>
            <hr className="my-4" />
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="comments" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={800} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
            
            <div className="flex items-center justify-left gap-4 mb-8">
                <label htmlFor="comments" className="w-40 text-left">
                    <Skeleton width="50%" height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
                </label>
                <Skeleton width={800} height={130} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
            </div>
        </section>
        <div className="flex justify-center mb-16">
            <Skeleton width={170} height={50} baseColor="#dce3e8" highlightColor="#f0f4f8" className=""/>
        </div>
    </form>
    
  );
}