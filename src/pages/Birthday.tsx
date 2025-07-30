/* 
CARA MENGGANTI KONTEN:
1. Ganti nama "Kayla" dengan nama yang diinginkan di semua tempat
2. Ubah pesan di variabel "birthdayMessage" 
3. Untuk musik: letakkan file music.mp3 di folder public/
4. Deploy ke GitHub Pages: push ke repo, aktifkan GitHub Pages di Settings

INSTRUKSI DEPLOY GITHUB PAGES:
1. Push semua file ke GitHub repository
2. Go to repository Settings → Pages
3. Set Source to "Deploy from branch" 
4. Set Branch to "main" atau "master"
5. Save dan tunggu beberapa menit
6. Website akan tersedia di: https://[username].github.io/[repository-name]
*/

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Gift, Cake } from "lucide-react";

const Birthday = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Pesan ulang tahun - bisa diganti sesuai keinginan
  const birthdayMessages = [
    "🌸 Ucapan Ulang Tahun untuk Kayla 🌸",
    "Selamat Ulang Tahun, Kayla! 🎉",
    "Hari ini, dunia bertambah cerah karena gadis manis seperti kamu bertambah usia",
    "Semoga di umur 15 ini, kamu selalu dikelilingi kebahagiaan...",
    "keberanian untuk bermimpi, dan semangat untuk terus tumbuh jadi pribadi yang hebat ✨",
    "Terima kasih sudah jadi sosok adik yang baik, ceria, dan selalu bikin bangga 💖",
    "Walaupun kita bukan saudara kandung, tapi kamu tetap adik yang selalu aku doakan dan aku jaga semampuku 🤍",
    "Never stop shining, Kayla.",
    "Karena dunia butuh lebih banyak orang baik dan bersinar sepertimu ⭐",
    "From your kakak yang selalu sayang dan bangga,",
    "— M 💕"
  ];

  // Auto play musik ketika komponen dimuat
  useEffect(() => {
    const audio = new Audio('/music.mp3'); // File musik harus ada di folder public/
    audio.loop = true;
    audio.volume = 0.3;
    
    // Play music with user interaction (modern browser requirement)
    const playMusic = () => {
      audio.play().catch(e => console.log('Audio play failed:', e));
    };
    
    // Try to play immediately
    playMusic();
    
    // Backup: play on first user interaction
    document.addEventListener('click', playMusic, { once: true });
    
    return () => {
      audio.pause();
      document.removeEventListener('click', playMusic);
    };
  }, []);

  // Animasi teks muncul perlahan
  useEffect(() => {
    if (showMessage && currentMessageIndex < birthdayMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 2000); // Setiap 2 detik muncul pesan baru
      
      return () => clearTimeout(timer);
    }
  }, [showMessage, currentMessageIndex, birthdayMessages.length]);

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  if (!showMessage) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 animate-bounce-gentle">
            <Heart className="text-birthday-pink w-8 h-8" />
          </div>
          <div className="absolute top-20 right-20 animate-sparkle">
            <Sparkles className="text-birthday-purple w-6 h-6" />
          </div>
          <div className="absolute bottom-20 left-20 animate-bounce-gentle" style={{animationDelay: '0.5s'}}>
            <Gift className="text-birthday-lavender w-7 h-7" />
          </div>
          <div className="absolute bottom-10 right-10 animate-sparkle" style={{animationDelay: '1s'}}>
            <Cake className="text-birthday-rose w-8 h-8" />
          </div>
          
          {/* Floating hearts */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce-gentle text-birthday-pink opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                fontSize: `${Math.random() * 20 + 15}px`
              }}
            >
              💖
            </div>
          ))}
        </div>

        <div className="text-center z-10 max-w-lg mx-auto">
          <div className="animate-slide-in-up">
            <h1 className="font-fredoka text-5xl md:text-7xl font-bold text-foreground mb-4">
              Selamat Ulang Tahun
            </h1>
            <h2 className="font-fredoka text-4xl md:text-6xl font-bold bg-gradient-birthday bg-clip-text text-transparent mb-8">
              Kayla! 🎂
            </h2>
            <p className="font-quicksand text-lg md:text-xl text-muted-foreground mb-8">
              Ada sesuatu yang spesial untuk adik tercinta... 💕
            </p>
            
            <Button 
              onClick={handleShowMessage}
              className="font-quicksand text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-dreamy hover:scale-105 transition-all duration-300"
            >
              Buka Pesan Spesial ✨
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle text-birthday-purple opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              fontSize: `${Math.random() * 15 + 10}px`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          {birthdayMessages.slice(0, currentMessageIndex).map((message, index) => (
            <div
              key={index}
              className="animate-fade-in-slow"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <p className="font-quicksand text-xl md:text-2xl text-foreground bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-dreamy border border-birthday-lavender/20">
                {message}
              </p>
            </div>
          ))}
        </div>

        {currentMessageIndex >= birthdayMessages.length && (
          <div className="mt-12 animate-slide-in-up">
            <div className="text-6xl mb-4">🎉🎂🎈</div>
            <p className="font-fredoka text-2xl text-birthday-purple font-semibold">
              Semoga hari ulang tahunmu menjadi hari yang tak terlupakan! 💖
            </p>
            
            <Button 
              onClick={() => window.location.reload()}
              className="mt-8 font-quicksand bg-gradient-birthday border-0 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-dreamy"
            >
              Mulai Lagi 🔄
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Birthday;