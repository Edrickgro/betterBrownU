package geolocator;

public class GeolocatorAlgorithm {

  public GeolocatorAlgorithm() {}

  public boolean isInRadius(GeolocatorObject location, double[] coords) {

    return this.euclideanDistance(location.getCoords(), coords) <= location.getRadius();
  }

  public double euclideanDistance(double[] coords1, double[] coords2) {

    double x1 = coords1[0];
    double y1 = coords1[1];
    double x2 = coords2[0];
    double y2 = coords2[1];

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}
