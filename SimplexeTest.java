
public class SimplexeTest {

	public static void main(String[] args){
		Simplexe s = Simplexe.lireFichier("data.txt");
		s.reso();
		System.out.println("varSort" + s.varSortante());
		while(s.solve())
			s.pivot();
		s.afficher();
			
	}
}

