import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;


public class Simplexe {

	private ArrayList<ArrayList<Float>> matrice;
	private int m;
	private int n;
	
	
	public Simplexe(ArrayList<ArrayList<Float>> tab,int m, int n){
		this.matrice=tab;
		this.m=m;
		this.n=n;
	}
	
	public static Simplexe lireFichier(String nom){
	    BufferedReader lecteurAvecBuffer = null;
	    String ligne;
	    ArrayList<ArrayList<Float>> tab = new ArrayList<ArrayList<Float>>();
	    try
	    {
	    	lecteurAvecBuffer = new BufferedReader(new FileReader(nom));
	    	ligne = lecteurAvecBuffer.readLine();
	    	String[] seperated = ligne.split(" ");
	    	int m = Integer.parseInt(seperated[0]);
	    	int n = Integer.parseInt(seperated[1]);
	    	
	    	while ((ligne = lecteurAvecBuffer.readLine()) !=null)
	    	{
	    		
	    		
	    		ArrayList<Float> ligneMatrice = new ArrayList<Float>();
	    		ligneMatrice.add(0.0f);
	    		seperated = ligne.split(" ");
	    		for(String s:seperated)
	    			ligneMatrice.add(Float.parseFloat(s));
	    		
	    		tab.add(ligneMatrice);
	    			
	    	}
	    	lecteurAvecBuffer.close();
	    	return new Simplexe(tab,m,n);
	    }
	    catch(Exception exc)
	    {exc.printStackTrace();}
	    
	    return null;
	  }
	
	public void reso(){
		this.afficher();
		this.initialisation();
		this.afficher();
		System.out.println(varEntrante());
		System.out.println(varSortante());
	}
	
	public void initialisation(){

		for(int i=0;i<this.n+1;i++)
			this.matrice.get(0).add(matrice.get(0).size(),0.0f);	
		for(int i=1;i<this.matrice.size();i++)
		{
			for(int j=1;j<=this.n;j++)
				if(i==j)
					this.matrice.get(i).add(matrice.get(i).size()-1,1.0f);
				else
					this.matrice.get(i).add(matrice.get(i).size()-1,0.0f);
		}
	}
	public int varEntrante(){
		for(int i=0;i<this.m+1;i++)
			if(this.matrice.get(0).get(i)>0)
				return i;	
		return -1;
	}
	
	public int varSortante(){
		int x = varEntrante();
		if(x <0)
			return -1;
		float max = matrice.get(1).get(matrice.get(1).size()-1);
		int ligne = 0;
		int indice = -1;
		for(ArrayList<Float> mat :this.matrice){
			if(ligne != 0){
				float resultat = mat.get(mat.size()-1);
				if(mat.get(x).intValue()!=0){
					float maxXLocal = resultat / mat.get(x);
					if(maxXLocal < max){
						max = maxXLocal;
						indice = ligne;
					}
					
				}
			}
			ligne++;
		}
		return indice;
	}
	public void pivot(){
		int indiceEntrant = varSortante();
		int indiceSortant = varSortante();
		if (indiceSortant < 0)
			return;
		int e = 0;
		for(int i = this.n; i < this.matrice.get(1).size(); i++){
			if(matrice.get(varSortante()).get(i)> 0){
				e = i;
				i = this.matrice.get(1).size();
			}
		}
		float diviseur = this.matrice.get(indiceSortant).get(indiceEntrant);
		float dividende = this.matrice.get(indiceSortant).get(matrice.get(1).size()-1);
		float x = dividende/diviseur;
		for(int i = 0; i < this.matrice.get(1).size(); i++){
			this.matrice.get(indiceSortant).set(i,this.matrice.get(indiceSortant).get(i)/diviseur);
		}
		ArrayList<Float> Ligne = this.matrice.get(indiceSortant);
		for(int i = 0; i < this.matrice.size();i++){
			if(i!=indiceSortant){
				float nbX = this.matrice.get(i).get(indiceEntrant);
				if(nbX != 0){
					this.matrice.get(i).set(indiceEntrant,new Float(0));
					for(int j = m; j < Ligne.size(); j++){
						this.matrice.get(i).set(j, this.matrice.get(i).get(j) - Ligne.get(j) * nbX);
					}
				}
			}
		}
		
			
		afficher();
	}
	public boolean solve(){
		for(int i = 1; i <= m + 1; i++)
			if(this.varEntrante() == -1 || this.varSortante() == -1)
				return false;
		return true;
	}
	public void afficher(){
		for(ArrayList<Float> mat:this.matrice)
		{    
		  for(int i=0;i<mat.size();i++)
		  {
			  if((float)mat.get(i)!=0)
				  System.out.print(mat.get(i)+"\t");
			  else
				  System.out.print("0\t");
		  } 
		  System.out.println("");     
		}
		
		System.out.println();
	}
}
