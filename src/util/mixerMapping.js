/**
 * This file primarily contains mappings from Utility Enums to Javascript representations, they're used for checking
 * values against the DaemonStatus, as well as sending updates, so order and naming is important! Some parts of the
 * code (such as faders and mixers) will directly reference array values, it's not ideal, but until some cleaner
 * representation can happen it's more efficient than constantly bouncing back and forward between array indexes.
 */

export const MuteFunction = [
    "All",
    "ToStream",
    "ToVoiceChat",
    "ToPhones",
    "ToLineOut",
]

export let MuteFunctionReadable = [
    "Mute All",
    "Mute to Stream",
    "Mute to Voice Chat",
    "Mute to Phones",
    "Mute to Line Out"
]

export const ScribbleNames = {
    "A": "Scribble1",
    "B": "Scribble2",
    "C": "Scribble3",
    "D": "Scribble4",
}

export const MuteButtonNamesForFader = {
    "A": "Fader1Mute",
    "B": "Fader2Mute",
    "C": "Fader3Mute",
    "D": "Fader4Mute",
}

export const InputDevice = {
    "Microphone": "Microphone",
    "Chat": "Chat",
    "Music": "Music",
    "Game": "Game",
    "Console": "Console",
    "Line In": "LineIn",
    "System": "System",
    "Samples": "Samples"
}

export const OutputDevice = {
    "Headphones": "Headphones",
    "Broadcast Mix": "BroadcastMix",
    "Line Out": "LineOut",
    "Chat Mic": "ChatMic",
    "Sampler": "Sampler",
}

export const ChannelName = [
    "Mic",
    "LineIn",
    "Console",
    "System",
    "Game",
    "Chat",
    "Sample",
    "Music",
    "Headphones",
    "MicMonitor",
    "LineOut",
]

export const ChannelNameReadable = {
    "Mic": "Mic",
    "LineIn": "Line In",
    "Console": "Console",
    "System": "System",
    "Game": "Game",
    "Chat": "Voice Chat",
    "Sample": "Sample",
    "Music": "Music",
    "Headphones": "Headphones",
    "MicMonitor": "Mic Monitor",
    "LineOut": "Line Out",
}

export const EffectPresets = [
    "Preset1",
    "Preset2",
    "Preset3",
    "Preset4",
    "Preset5",
    "Preset6",
]

export const EffectLightingPresets = [
    "EffectSelect1",
    "EffectSelect2",
    "EffectSelect3",
    "EffectSelect4",
    "EffectSelect5",
    "EffectSelect6",
]

export const EncoderLighting = [
    "Reverb",
    "Echo",
    "Pitch",
    "Gender",
]

export const EffectButtons = [
    "EffectMegaphone",
    "EffectRobot",
    "EffectHardTune",
    "EffectFx",
]

export const EffectButtonText = [
    "Megaphone",
    "Robot",
    "Hardtune",
    "Fx",
]


export const EqMiniFreqs = [
    "Equalizer90Hz",
    "Equalizer250Hz",
    "Equalizer500Hz",
    "Equalizer1KHz",
    "Equalizer3KHz",
    "Equalizer8KHz",
]

export const EqFreqs = [
    "Equalizer31Hz",
    "Equalizer63Hz",
    "Equalizer125Hz",
    "Equalizer250Hz",
    "Equalizer500Hz",
    "Equalizer1KHz",
    "Equalizer2KHz",
    "Equalizer4KHz",
    "Equalizer8KHz",
    "Equalizer16KHz",
]

export const MicrophoneTypes = [
    "Dynamic",
    "Condenser",
    "Jack",
]

// I'm using indexOf for the values in this array just for readability.
export let FaderOrder = [
    "Mic",
    "Chat",
    "Music",
    "Game",
    "Console",
    "LineIn",
    "System",
    "Sample",
    "Headphones",
    "LineOut"
]

export let MixerOrder = [
    "Mic",
    "Chat",
    "Music",
    "Game",
    "Console",
    "LineIn",
    "LineOut",
    "System",
    "Sample",
]

export let HeadphoneMixerOrder = [
    "Headphones",
    "MicMonitor",
]

export let HeadphoneMixerHidden = [
    "MicMonitor"
]
