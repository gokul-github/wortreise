package app.wortreise.learn;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/**
 * Writes and reads the same wortreise-backup JSON the website downloads.
 * Uses the system document UI so no storage permission is required.
 */
@CapacitorPlugin(name = "BackupFile")
public class BackupFilePlugin extends Plugin {
    private static final int MAX_BYTES = 2_000_000;

    @PluginMethod
    public void save(PluginCall call) {
        String text = call.getString("text");
        if (text == null) {
            call.reject("Missing backup");
            return;
        }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, safeName(call.getString("filename")));
        startActivityForResult(call, intent, "saveResult");
    }

    @ActivityCallback
    private void saveResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null) {
            JSObject cancelled = new JSObject();
            cancelled.put("cancelled", true);
            call.resolve(cancelled);
            return;
        }
        Uri uri = result.getData().getData();
        String text = call.getString("text", "");
        if (uri == null) {
            call.reject("Could not write the backup");
            return;
        }
        try (OutputStream out = getContext().getContentResolver().openOutputStream(uri)) {
            if (out == null) {
                call.reject("Could not write the backup");
                return;
            }
            out.write(text.getBytes(StandardCharsets.UTF_8));
            JSObject ok = new JSObject();
            ok.put("cancelled", false);
            ok.put("saved", true);
            call.resolve(ok);
        } catch (Exception error) {
            call.reject("Could not write the backup", error);
        }
    }

    @PluginMethod
    public void pick(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");
        intent.putExtra(
            Intent.EXTRA_MIME_TYPES,
            new String[] { "application/json", "text/plain", "text/*", "application/octet-stream" }
        );
        startActivityForResult(call, intent, "pickResult");
    }

    @ActivityCallback
    private void pickResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null) {
            JSObject cancelled = new JSObject();
            cancelled.put("cancelled", true);
            call.resolve(cancelled);
            return;
        }
        Uri uri = result.getData().getData();
        if (uri == null) {
            call.reject("Could not read the backup");
            return;
        }
        try {
            String text = readText(uri);
            JSObject ok = new JSObject();
            ok.put("cancelled", false);
            ok.put("text", text);
            call.resolve(ok);
        } catch (Exception error) {
            call.reject("Could not read the backup", error);
        }
    }

    private String readText(Uri uri) throws Exception {
        try (InputStream in = getContext().getContentResolver().openInputStream(uri)) {
            if (in == null) throw new Exception("empty file");
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int n;
            int total = 0;
            while ((n = in.read(buf)) != -1) {
                total += n;
                if (total > MAX_BYTES) throw new Exception("file is too large");
                out.write(buf, 0, n);
            }
            String text = new String(out.toByteArray(), StandardCharsets.UTF_8);
            if (text.startsWith("\uFEFF")) text = text.substring(1);
            return text;
        }
    }

    private String safeName(String filename) {
        String name = filename == null ? "" : filename.replaceAll("[\\\\/:*?\"<>|]", "-").trim();
        if (name.isEmpty()) name = "wortreise-backup.json";
        if (!name.endsWith(".json")) name = name + ".json";
        return name;
    }
}
