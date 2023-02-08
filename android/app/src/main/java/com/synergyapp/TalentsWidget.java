package com.synergyapp;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.widget.ImageView;
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
        intent.setData(Uri.parse("synergyapp://page=detail&id=1"));
        return PendingIntent.getActivity(context, 0, intent, 0);
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
            views.setTextViewText(R.id.talentName1, renderData.getJSONObject(0).getString("name"));
            views.setTextViewText(R.id.talentName2, renderData.getJSONObject(1).getString("name"));
            views.setTextViewText(R.id.talentName3, renderData.getJSONObject(2).getString("name"));
            views.setTextViewText(R.id.talentName4, renderData.getJSONObject(3).getString("name"));

            loadImage(views, renderData.getJSONObject(0).getString("image"), R.id.imageTalent1);
            loadImage(views, renderData.getJSONObject(1).getString("image"), R.id.imageTalent2);
            loadImage(views, renderData.getJSONObject(2).getString("image"), R.id.imageTalent3);
            loadImage(views, renderData.getJSONObject(3).getString("image"), R.id.imageTalent4);


            // Instruct the widget manager to update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        } catch (Exception err) {
            err.printStackTrace();
        }
    }
}