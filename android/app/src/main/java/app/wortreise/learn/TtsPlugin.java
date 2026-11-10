package app.wortreise.learn;

import android.content.Intent;
import android.media.AudioAttributes;
import android.speech.tts.TextToSpeech;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.Locale;

@CapacitorPlugin(name = "Tts")
public class TtsPlugin extends Plugin implements TextToSpeech.OnInitListener {
    private TextToSpeech tts;
    private boolean ready;
    private String pending;
    private boolean promptedInstall;

    @Override
    public void load() {
        getActivity().runOnUiThread(() -> tts = new TextToSpeech(getContext(), this));
    }

    @Override
    public void onInit(int status) {
        if (status != TextToSpeech.SUCCESS || tts == null) return;
        tts.setAudioAttributes(
            new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                .build()
        );
        tts.setSpeechRate(0.92f);
        int lang = tts.setLanguage(Locale.GERMANY);
        if (lang == TextToSpeech.LANG_MISSING_DATA || lang == TextToSpeech.LANG_NOT_SUPPORTED) {
            lang = tts.setLanguage(Locale.GERMAN);
        }
        ready = true;
        if (pending != null) {
            speakNow(pending);
            pending = null;
        }
        if (lang == TextToSpeech.LANG_MISSING_DATA) {
            promptInstall();
        }
    }

    @PluginMethod
    public void speak(PluginCall call) {
        String text = call.getString("text", "");
        if (text == null || text.trim().isEmpty()) {
            call.resolve();
            return;
        }
        getActivity().runOnUiThread(() -> {
            if (!ready || tts == null) {
                pending = text;
            } else {
                speakNow(text);
            }
            call.resolve();
        });
    }

    @PluginMethod
    public void stop(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (tts != null) tts.stop();
            pending = null;
            call.resolve();
        });
    }

    @Override
    protected void handleOnDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
            tts = null;
        }
        ready = false;
    }

    private void speakNow(String text) {
        int lang = tts.setLanguage(Locale.GERMANY);
        if (lang == TextToSpeech.LANG_MISSING_DATA || lang == TextToSpeech.LANG_NOT_SUPPORTED) {
            tts.setLanguage(Locale.GERMAN);
            if (lang == TextToSpeech.LANG_MISSING_DATA) promptInstall();
        }
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "wortreise");
    }

    private void promptInstall() {
        if (promptedInstall) return;
        promptedInstall = true;
        try {
            Intent install = new Intent(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
            install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(install);
        } catch (Exception ignored) {
            // The device has no voice-data installer. Speak with whatever engine is present.
        }
    }
}
