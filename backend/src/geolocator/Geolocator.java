package geolocator;

import net.sf.javaml.core.kdtree.KDTree;
import java.util.List;

/**
 * The Geolocator class stores locations of campus locations and the number of
 * people occupying those locations.
 */
public class Geolocator {

  private KDTree geolocatorKDTree = new KDTree(2);
  private GeolocatorAlgorithm geolocatorAlgorithm = new GeolocatorAlgorithm();

  /**
   * This is the constructor of the Geolocator class.
   */
  public Geolocator(List<GeolocatorObject> geolocatorObjectList) {

    //geolocatorObjectList.stream().map(object -> {geolocatorKDTree.insert(object.getCoords(), object)}).forEach();

    // Insert locations in geolocatorObjectList into geolocatorKDTree
    for (GeolocatorObject object: geolocatorObjectList) {
      geolocatorKDTree.insert(object.getCoords(), object);
    }
  }

  public void checkUserCoords(double[] coords) {

    GeolocatorObject nearestLocation = (GeolocatorObject) geolocatorKDTree.nearest(coords);

    if (this.geolocatorAlgorithm.isInRadius(nearestLocation, coords)) {

      nearestLocation.incrementOccupancy();
    }
  }
}