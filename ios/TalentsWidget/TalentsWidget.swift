//
//  WidgetTalent.swift
//  synergyapp
//
//  Created by Catur Adji Prasetyo on 15/01/23.
//

import WidgetKit
import SwiftUI
import Intents

struct Person : Decodable {
  var id : Int
  var name : String
  var image : String
}

struct newData : Decodable {
  var renderData : [Person]
  var LastVisited : Person
}

struct TalentEntry : TimelineEntry {
  var renderData : [Person]
  var LastVisited : Person
  var date: Date
}

struct FallbackData {
  var type : String
  var data : newData
  
  init(name : String) {
    type = name
    data = newData(
      renderData: [
        Person(id: 1, name: "\(type) 1", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
        Person(id: 2, name: "\(type) 2", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
        Person(id: 3, name: "\(type) 3", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
        Person(id: 4, name: "\(type) 3", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
    ], LastVisited: Person(id: 1, name: "\(type) Last Visited", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg")
    )
  }
}

struct TalentProvider : TimelineProvider {
  var dataPlaceholder : newData = FallbackData(name: "Placeholder").data
  var dataSnapshot : newData = FallbackData(name: "Snapshoot").data
  var dataErrorParse: newData = FallbackData(name: "Error").data
  var dataErrorParse2: newData = FallbackData(name: "Error 2").data
  
  func placeholder(in context: Context) -> TalentEntry {
    TalentEntry(renderData: dataPlaceholder.renderData, LastVisited: dataPlaceholder.LastVisited, date: Date())
  }
  
  func getSnapshot(in context: Context, completion: @escaping (TalentEntry) -> Void) {
    let entry = TalentEntry(renderData: dataSnapshot.renderData, LastVisited: dataSnapshot.LastVisited, date: Date())
    completion(entry)
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
    let userDefault = UserDefaults.init(suiteName: "group.talents")
    
    if userDefault != nil {
      let date = Date()
      if let savedData = userDefault?.value(forKey: "Data") as? String {
        let decoder = JSONDecoder()
        let data2 = savedData.data(using: .utf8)
        print(data2 as Any)
        if let parsedData = try? decoder.decode(newData.self, from: data2!) {
          let entry = TalentEntry(renderData: parsedData.renderData, LastVisited: parsedData.LastVisited, date: date)
          let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 5, to: date)!
          
          let timeline = Timeline(
            entries: [entry],
            policy: .after(nextUpdateDate)
          )
          
          completion(timeline)
          WidgetCenter.shared.reloadAllTimelines();
        } else {
          let entry = TalentEntry(renderData: dataErrorParse.renderData, LastVisited: dataErrorParse.LastVisited, date: Date())
          let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 5, to: date)!
          
          let timeline = Timeline(
            entries: [entry],
            policy: .after(nextUpdateDate)
          )
          
          completion(timeline)
          WidgetCenter.shared.reloadAllTimelines();
        }
      } else {
        let entry = TalentEntry(renderData: dataErrorParse2.renderData, LastVisited: dataErrorParse2.LastVisited, date: Date())
        let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 5, to: date)!
        
        let timeline = Timeline(
          entries: [entry],
          policy: .after(nextUpdateDate)
        )
        completion(timeline)
      }
    }
  }
}

struct TalentsWidget: Widget {
  var body: some WidgetConfiguration{
    StaticConfiguration(
      kind: "Talents",
      provider: TalentProvider()) { entry in
        TalentWidgetView(entry: entry)
      }
    .configurationDisplayName("Talents")
    .description("Available talents to invite")
    .supportedFamilies([.systemMedium, .systemSmall, .accessoryCircular])
  }
}

struct NetworkImage: View {
  let url: URL?
  var body: some View {
    Group {
     if let url = url, let imageData = try? Data(contentsOf: url),
       let uiImage = UIImage(data: imageData) {
       Image(uiImage: uiImage)
         .resizable()
         .aspectRatio(contentMode: .fill)
         .frame(width: 50, height: 50)
         .clipShape(Circle())
         .padding(4)
      }
      else {
        Text("No Images")
          .foregroundColor(.gray)
          .font(.system(size: 12))
          .frame(width: 50, height: 60)
          .clipShape(Circle())
      }
    }
  }
}

struct headerWidget : View {
  let headerInfo : String
  var body: some View {
    HStack{
      Text("Talents")
        .bold()
        .foregroundColor(.black)
        .font(.system(size: 22))
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.leading, 25)
      Text(headerInfo)
        .foregroundColor(.gray)
        .fontWeight(.light)
        .font(.system(size: 15))
        .frame(maxWidth: .infinity, alignment: .trailing)
        .padding(.trailing, 25)
    }
  }
}

struct mediumWidget : View {
  var entry : TalentProvider.Entry
  var body: some View {
    VStack{
      headerWidget(headerInfo: "7.234 Available")
      HStack{
        ForEach(0..<entry.renderData.count, id: \.self) { (index) in
          TalentCard(entry: entry.renderData[index])
        }
      }
    }
  }
}

struct smallWidget : View {
  var entry : TalentProvider.Entry
  var body : some View {
    VStack{
      headerWidget(headerInfo: "Last Visited")
      NetworkImage(url: URL(string: entry.LastVisited.image))
      Text(entry.LastVisited.name)
        .foregroundColor(.black)
        .font(.system(size: 12))
        .frame(width: 65, height: 25)
    }
    .widgetURL(
      entry.LastVisited.id != 0
        ? URL(string: "synergyapp://page=Detail&id=\(entry.LastVisited.id)")
        : URL(string: "")
    )
  }
}

struct circleLockWidget : View {
  var entry : TalentProvider.Entry
  var body: some View {
    NetworkImage(url: URL(string: entry.LastVisited.image))
      .widgetURL(
        entry.LastVisited.id != 0
          ? URL(string: "synergyapp://page=Detail&id=\(entry.LastVisited.id)")
          : URL(string: "")
      )
  }
}

struct TalentWidgetView : View {
  @Environment(\.widgetFamily) var family: WidgetFamily

  var entry : TalentProvider.Entry;
  
  var body: some View {
    switch family {
    case .systemSmall:
      smallWidget(entry: entry)
    case .systemMedium:
      mediumWidget(entry: entry)
    case .accessoryCircular:
      circleLockWidget(entry: entry)
    default: mediumWidget(entry: entry)
    }
  }
}

struct TalentCard : View {
  var entry : Person
  var body: some View {
    Link(destination: URL(string: "synergyapp://page=Detail&id=\(entry.id)")!){
      VStack{
        NetworkImage(url: URL(string: entry.image))
        Text(entry.name)
          .foregroundColor(.black)
          .font(.system(size: 12))
          .frame(width: 65, height: 25)
      }
      .contentShape(Rectangle())
      .clipped()
    }
  }
}

struct TalentWidgetPreview : PreviewProvider {
  static var previews: some View {
    TalentWidgetView(entry: TalentEntry(renderData: [Person(id: 1, name: "Neme", image: ""), Person(id: 2, name: "Neme2", image: "")], LastVisited: Person(id: 1, name: "Neme", image: ""), date: Date())).previewContext(WidgetPreviewContext(family: .systemMedium))
  }
}

