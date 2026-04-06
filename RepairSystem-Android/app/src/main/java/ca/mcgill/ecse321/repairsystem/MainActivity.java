package ca.mcgill.ecse321.repairsystem;

import android.content.Intent;
import android.os.Bundle;
import cz.msebera.android.httpclient.Header;

import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;

import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;


import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
    private String error = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        goLogIn();
        goSignUp( findViewById(R.id.startSignUp));
        createServices();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * Redirects to the logIn page
     */
    public void goLogIn(){
        Button toLogIn = findViewById(R.id.startLogIn);

        //handle event list
       toLogIn.setOnClickListener(new View.OnClickListener(){
           @Override
           public void onClick(View view){
               startActivity(new Intent(MainActivity.this, LogIn.class));
           }
       });
    }

    /**
     * Redirects to the Sign Up page
     */
   public void goSignUp(View v){
       Button toSignUp = findViewById(R.id.startSignUp);
       //handle event list
       toSignUp.setOnClickListener(new View.OnClickListener(){
           @Override
           public void onClick(View view){
               startActivity(new Intent(MainActivity.this, SignUp.class));
           }
       });
    }

    /**
     * During boot up, the system will create the mechanics
     */

    public void createServices() {
        String request = "";
        request = request.concat("CarRepair");
        request = request.concat("50");
        HttpUtils.post("services/" + request, new RequestParams(), new JsonHttpResponseHandler()
        {
            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                try {
                    error += errorResponse.get("").toString();
                } catch (JSONException e) {
                    error += e.getMessage();
                }
            }
        });
    }
}