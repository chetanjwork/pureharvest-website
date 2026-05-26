import Foundation
import Vision
import AppKit

func recognizeText(in imagePath: String) {
    let url = URL(fileURLWithPath: imagePath)
    guard let image = NSImage(contentsOf: url),
          let tiffData = image.tiffRepresentation,
          let imageSource = CGImageSourceCreateWithData(tiffData as CFData, nil),
          let cgImage = CGImageSourceCreateImageAtIndex(imageSource, 0, nil) else {
        print("Failed to load image: \(imagePath)")
        return
    }
    
    let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    let request = VNRecognizeTextRequest { (request, error) in
        guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
        var recognizedText = [String]()
        for observation in observations {
            guard let topCandidate = observation.topCandidates(1).first else { continue }
            recognizedText.append(topCandidate.string)
        }
        print("--- File: \(url.lastPathComponent) ---")
        if recognizedText.isEmpty {
            print("No text found.")
        } else {
            print(recognizedText.joined(separator: " | "))
        }
    }
    
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    
    do {
        try requestHandler.perform([request])
    } catch {
        print("Unable to perform request: \(error).")
    }
}

let fm = FileManager.default
let basePath = "/Users/chetanjadhav/Downloads/Antigravity/Pure Harvest/client/public"
do {
    let files = try fm.contentsOfDirectory(atPath: basePath)
    let bottleFiles = files.filter { $0.hasPrefix("C_Bottle") || $0.hasPrefix("S_Bottle") }.sorted()
    for file in bottleFiles {
        let fullPath = "\(basePath)/\(file)"
        recognizeText(in: fullPath)
    }
} catch {
    print("Error reading directory: \(error)")
}
