import { MaterialIcons } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';
import { useEffect, useRef, useState } from 'react';
interface VoiceSearchProps {
    onSearch: (query: string) => void;
}
const VcVoice = ({ onSearch }: VoiceSearchProps) => {
    const [query, setQuery] = useState("");
    const [isListening, setIsListening] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);
    const onSpeechStart = () => {
        setIsListening(true);
    };

    const onSpeechEnd = () => {
        setIsListening(false);
    };

    const onSpeechResults = (e: any) => {
        const text = e.value[0];
        setQuery(text);
        onSearch(text);
        // Reset the timeout when new speech results are received
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            stopListening();
        }, 1000); // 1 second timeout
    };

    const startListening = async () => {
        try {
            await Voice.start('vi-VN');
        } catch (e) {
            console.error(e);
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <MaterialIcons name={isListening ? "mic-off" : "mic"} size={24} color={isListening ? "red" : "blue"}
            onPress={isListening ? stopListening : startListening}
        />
    );
}
export default VcVoice;