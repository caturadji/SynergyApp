package com.synergyapp;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import jp.wasabeef.picasso.transformations.CropCircleTransformation;

/**
 * Implementation of App Widget functionality.
 */
public class TalentsWidget extends AppWidgetProvider {

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    static void loadImage (RemoteViews views, String url, int id) {
        Picasso
            .get()
            .load(url)
            .resize(250,250)
            .centerCrop()
            .transform(new CropCircleTransformation())
            .into(new Target() {
            @Override
            public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
                views.setImageViewBitmap(id, bitmap);
            }

            @Override
            public void onBitmapFailed(Exception e, Drawable errorDrawable) {
                e.printStackTrace();
            }

            @Override
            public void onPrepareLoad(Drawable placeHolderDrawable) {

            }
        });
    }

    static PendingIntent getPendingSelfIntent(Context context, int id) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse("synergyapp://page=Detail&id="+id));
        return PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
    }

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
            int appWidgetId) {

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"LastVisited\": {\"id\": 0, \"image\": \"\", \"name\": \"Not available\"}, \"renderData\": [{\"id\": 0, \"image\": \"\", \"name\": \"Not available\"}]}");
            JSONObject appData = new JSONObject(appString);

            JSONArray renderData = appData.getJSONArray("renderData");

            // Construct the RemoteViews object
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.talents_widget);

            for (int i = 0; i < renderData.length(); i++) {
                int textID;
                int imageID;

                if (i == 0) {
                    textID = R.id.talentName1;
                    imageID = R.id.imageTalent1;
                } else if (i == 1) {
                    textID = R.id.talentName2;
                    imageID = R.id.imageTalent2;
                } else if (i == 2) {
                    textID = R.id.talentName3;
                    imageID = R.id.imageTalent3;
                } else {
                    textID = R.id.talentName4;
                    imageID = R.id.imageTalent4;
                }

                String textValue = renderData.getJSONObject(i).getString("name");
                views.setTextViewText(textID, textValue);

                String imageValue = renderData.getJSONObject(i).getString("image");
                loadImage(views, imageValue, imageID);

                int id = Integer.parseInt(renderData.getJSONObject(i).getString("id"));
                views.setOnClickPendingIntent(imageID, getPendingSelfIntent(context, id));
            }

            // Instruct the widget manager to update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        } catch (JSONException err) {
            err.printStackTrace();
        }
    }
}