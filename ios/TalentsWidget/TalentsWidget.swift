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

struct TalentEntry : TimelineEntry{
  var talents : Array<Person>
  var date: Date
}

struct TalentProvider : TimelineProvider {
  var fallBackData : [Person] = [
    Person(id: 1, name: "Talent 1", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
    Person(id: 2, name: "Talent 2", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
    Person(id: 3, name: "Talent 3", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
    Person(id: 4, name: "Talent 3", image: "https://t3.ftcdn.net/jpg/00/86/56/12/360_F_86561234_8HJdzg2iBlPap18K38mbyetKfdw1oNrm.jpg"),
  ]
  
  func placeholder(in context: Context) -> TalentEntry {
    TalentEntry(talents: fallBackData, date: Date())
  }
  
  func getSnapshot(in context: Context, completion: @escaping (TalentEntry) -> Void) {
    let date = Date()
    let entry = TalentEntry(talents: fallBackData, date: date)
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
        if let parsedData = try? decoder.decode([Person].self, from: data2!) {
          let entry = TalentEntry(talents: parsedData, date: date)
          let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 5, to: date)!
          
          let timeline = Timeline(
            entries: [entry],
            policy: .after(nextUpdateDate)
          )
          completion(timeline)
        } else {
          let entry = TalentEntry(talents: [Person(id: 1, name: "Neme", image: ""), Person(id: 2, name: "Neme2", image: "")], date: date)
          let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 5, to: date)!
          
          let timeline = Timeline(
            entries: [entry],
            policy: .after(nextUpdateDate)
          )
          completion(timeline)
        }
      } else {
        let entry = TalentEntry(talents: [Person(id: 1, name: "Tulung", image: "")], date: date)
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
      kind: "Talents" ,
      provider: TalentProvider()
    ){ entry in
      TalentWidgetView(entry: entry)
    }
    .configurationDisplayName("Talents")
    .description("Available talents to invite")
    .supportedFamilies([.systemMedium])
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
      }
    }
  }

}

struct TalentWidgetView : View {
  var entry : TalentProvider.Entry
  var body: some View {
    VStack{
      HStack{
        Text("Talents")
          .bold()
          .foregroundColor(.black)
          .font(.system(size: 22))
          .frame(maxWidth: .infinity, alignment: .leading)
          .padding(.leading, 25)
        Text("7.234 Available")
          .foregroundColor(.gray)
          .fontWeight(.light)
          .font(.system(size: 15))
          .frame(maxWidth: .infinity, alignment: .trailing)
          .padding(.trailing, 25)
      }
      HStack{
        ForEach(0..<entry.talents.count, id: \.self) { (index) in
          TalentCard(entry: entry.talents[index])
        }
      }
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
    TalentWidgetView(entry: TalentEntry(talents: [Person(id: 1, name: "Neme", image: ""), Person(id: 2, name: "Neme2", image: "")], date: Date())).previewContext(WidgetPreviewContext(family: .systemMedium))
  }
}

