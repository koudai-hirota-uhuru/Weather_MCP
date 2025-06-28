import axios from 'axios';
export async function getWeather(city) {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const { temp } = response.data.main;
        const { description } = response.data.weather[0];
        return `${city}の現在の天気：\n気温: ${temp}°C\n天気: ${description}`;
    }
    catch (error) {
        console.error('天気情報の取得に失敗しました:', error);
        return '天気情報の取得に失敗しました。';
    }
}
