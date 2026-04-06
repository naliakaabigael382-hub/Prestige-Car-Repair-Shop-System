package ca.mcgill.ecse321.repairsystem;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONException;
import org.json.JSONObject;

import cz.msebera.android.httpclient.Header;

public class SignUp extends AppCompatActivity {
    private String error;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Set up the sign-up button listener here
        Button toSignUp = findViewById(R.id.button_signUp);
        toSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                signUp();
            }
        });
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

    private void signUp() {
        error = "";
        final EditText email = findViewById(R.id.new_email);
        final EditText password = findViewById(R.id.new_password);
        final EditText name = findViewById(R.id.new_name);
        final EditText phone = findViewById(R.id.new_phone);
        final EditText address = findViewById(R.id.new_address);
        final EditText credit = findViewById(R.id.credit);
        final EditText debit = findViewById(R.id.debit);

        try {
            // Validate and parse name
            String[] nameParts = name.getText().toString().trim().split(" ");
            if (nameParts.length < 2) {
                throw new IllegalArgumentException("Name must include both first and last name.");
            }
            String firstName = nameParts[0];
            String lastName = nameParts[1];

            // Validate and parse address (allow single word or character)
            String addressInput = address.getText().toString().trim();
            if (addressInput.isEmpty()) {
                throw new IllegalArgumentException("Address cannot be empty.");
            }

            // Build request string
            String request = firstName + lastName
                    + "?password=" + password.getText().toString()
                    + "&phone=" + phone.getText().toString()
                    + "&email=" + email.getText().toString()
                    + "&credit=" + credit.getText().toString()
                    + "&debit=" + debit.getText().toString()
                    + "&address=" + addressInput;

            // Make HTTP POST request
            HttpUtils.post("customer/" + request, new RequestParams(), new JsonHttpResponseHandler() {
                @Override
                public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                    Intent intent = new Intent(SignUp.this, homePage.class);
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
                        error += errorResponse.getString("message");
                    } catch (JSONException e) {
                        error += "Failed to parse error message.";
                    }
                    refreshErrorMessage();
                }
            });

        } catch (IllegalArgumentException e) {
            error = e.getMessage();
            refreshErrorMessage();
        }
    }
}