package ca.mcgill.ecse321.repairsystem;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;

public class ReceiptActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_receipt);

        // Initialize WebView
        webView = findViewById(R.id.webView_receipt);

        // Enable JavaScript if needed
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        // Get the receipt URL passed from the previous activity
        String receiptUrl = getIntent().getStringExtra("receiptUrl");

        if (receiptUrl != null) {
            // Load the URL in the WebView
            webView.loadUrl(receiptUrl);
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        // Optionally, override back press to close the WebView correctly if needed
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
