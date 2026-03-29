const SkeletonLoader = () => {
  return (
    // animate-pulse adalah class bawaan Tailwind untuk efek kedap-kedip lambat
    <div className="w-full animate-pulse mt-6">
      
      {/* 1. SKELETON KARTU CUACA UTAMA */}
      <div className="p-6 bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg mb-6 text-center border border-white/20">
        {/* Judul Kota */}
        <div className="h-8 bg-blue-200/60 rounded-full w-1/2 mx-auto mb-4"></div>
        
        {/* Ikon Bulat Besar */}
        <div className="w-32 h-32 bg-blue-200/60 rounded-full mx-auto mb-4"></div>
        
        {/* Suhu Besar */}
        <div className="h-16 bg-blue-200/60 rounded-xl w-1/3 mx-auto mb-4"></div>
        
        {/* Deskripsi Cuaca */}
        <div className="h-6 bg-blue-200/60 rounded-full w-1/4 mx-auto"></div>

        {/* Grid Kelembapan & Angin */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="flex flex-col items-center">
            <div className="h-4 bg-blue-200/60 rounded-full w-1/2 mb-2"></div>
            <div className="h-6 bg-blue-200/60 rounded-xl w-1/3"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-4 bg-blue-200/60 rounded-full w-1/2 mb-2"></div>
            <div className="h-6 bg-blue-200/60 rounded-xl w-1/3"></div>
          </div>
        </div>
      </div>

      {/* 2. SKELETON KARTU RAMALAN 5 HARI */}
      <div className="mt-8 pt-6 border-t border-gray-200/60">
        {/* Judul Ramalan */}
        <div className="h-4 bg-blue-200/60 rounded-full w-1/2 mx-auto mb-6"></div>
        
        <div className="flex justify-center gap-3 overflow-x-hidden pb-4">
          {/* Mengulang 5 kotak kecil menggunakan trik Array */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div 
              key={item} 
              className="flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm p-4 rounded-2xl shadow-md min-w-[80px]"
            >
              <div className="h-3 bg-blue-200/60 rounded-full w-full mb-2"></div>
              <div className="w-12 h-12 bg-blue-200/60 rounded-full my-1"></div>
              <div className="h-5 bg-blue-200/60 rounded-xl w-full mt-2"></div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default SkeletonLoader;