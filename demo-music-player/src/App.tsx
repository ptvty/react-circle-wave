import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { CircleWave } from 'react-circle-wave';
import { Button, LoopIcon, LoudIcon, NextIcon, PrevIcon, QuietIcon, ShuffleIcon } from './components';
import { themes } from './themes';

function App() {
    const [stopped, setStopped] = useState(true);
    const [hover, setHover] = useState(false);
    const [quiet, setQuiet] = useState(true);
    const [loop, setLoop] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        stopped
            ? audioRef.current?.pause()
            : audioRef.current?.play();
    }, [stopped]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (quiet) {
            audioRef.current.volume = .2;
        } else {
            audioRef.current.volume = 1;
        }
    }, [quiet]);

    useEffect(() => {
        console.log(audioRef.current);

        audioRef.current?.addEventListener('ended', () => {
            setStopped(true);
        });
    }, []);

    const [themeId, setThemeId] = useState(0);
    const theme = themes[themeId];

    return (
        <div
            className={`
                App h-[100vh] pt-40 bg-gradient-to-r
                ${theme.bg === 'dark' ? 'from-slate-400 to-slate-500' : 'from-slate-100 to-slate-200'}
            `}
        >
            {/* <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/01/18/audio_ea75bab6d8.mp3" /> */}
            <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2024/03/01/audio_7f4947e931.mp3" />

            <div
                className={`flex flex-row p-3 max-w-screen-sm m-auto border-1 shadow rounded-full`}
                style={{ backgroundColor: theme?.box || '#fff' }}
            >

                <div className="basis-1/5 m-auto">
                    <Button onClick={() => setLoop(l => !l)} color={theme.icons}>
                        {loop
                            ? <LoopIcon />
                            : <ShuffleIcon />
                        }
                    </Button>
                </div>

                <div className="basis-1/5 m-auto">
                    <Button onClick={() => setThemeId(id => id <= 0 ? themes.length - 1 : id - 1)} color={theme.icons}>
                        <PrevIcon />
                    </Button>
                </div>

                <div className="basis-1/5 m-auto">
                    <CircleWave
                        size={120}
                        stopped={stopped}
                        style={{ cursor: 'pointer', opacity: hover ? .85 : 1, margin: 'auto' }}
                        onClick={() => setStopped(s => !s)}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        {...theme}
                    >
                        {stopped
                            ? <div style={{ color: theme.icon || '#eee', marginTop: 8 }}>
                                <svg className="m-auto mt-10" width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                            : <div style={{ color: theme.icon || '#eee', marginTop: 8 }}>
                                <svg className="m-auto mt-10" width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                        }
                    </CircleWave>
                </div>

                <div className="basis-1/5 m-auto">
                    <Button onClick={() => setThemeId(id => id >= themes.length - 1 ? 0 : id + 1)} color={theme.icons}>
                        <NextIcon />
                    </Button>
                </div>

                <div className="basis-1/5 m-auto">
                    <Button onClick={() => setQuiet(q => !q)} color={theme.icons}>
                        {quiet
                            ? <QuietIcon />
                            : <LoudIcon />
                        }
                    </Button>
                </div>
            </div>
            <div className='pt-40 font-light max-w-screen-sm m-auto'>
                <p style={{ fontSize: 18}}>
                    This is a demo music player to showcase <a href="../" style={{ fontFamily: 'monospace' }}>react-circle-wave</a> React component.
                    <br />
                    Click the next / prev buttons to browse a list of predefined props.
                </p>
                <p className="pt-16 ">
                    Music by <a href="https://pixabay.com/users/jeremusic70-25199461/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=194049">Jeremiah Alves</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=194049">Pixabay</a>
                </p>
            </div>
        </div>
    );
}

export default App;
