package ca.mcgill.ecse321.repairsystem;

import android.content.Intent;
import android.os.Bundle;

import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONObject;
import org.json.JSONException;
import cz.msebera.android.httpclient.Header;

public class LogIn extends AppCompatActivity {
    private String error;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        logIn(findViewById(R.id.button_logIn));
    }

    private void refreshErrorMessage() {
        TextView tvError = findViewById(R.id.error);
        tvError.setText(error);

        if (error == null || error.length() == 0) {
            tvError.setVisibility(View.GONE);
        } else {
            tvError.setVisibility(View.VISIBLE);
        }
    }
    /*
        get an existing customer's profile from the database to login
     */
    public void logIn(View v ) {
        error = "";
        Button toLogIn = (Button) findViewById(R.id.button_logIn);
        toLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final EditText email = (EditText) findViewById(R.id.email);
                final EditText password = (EditText) findViewById(R.id.password);

                RequestParams requestParams = new RequestParams();
                String request = "";
                request = request.concat(email.getText().toString());
                request = request.concat("?password="+password.getText().toString());

                HttpUtils.get("customer/login/" +request, requestParams, new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                        refreshErrorMessage();
                        //change page once logged in
                        Intent intent = new Intent(LogIn.this, homePage.class);
                        try {
                            intent.putExtra("customerId", response.getString("id"));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        startActivity(intent);
                    }
                    @Override
                    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                        try {
                            error += errorResponse.get(" email and password ").toString();
                        } catch (JSONException e) {
                            error += e.getMessage();
                        }
                        refreshErrorMessage();
                    }
                });
            }
        });
    }
}